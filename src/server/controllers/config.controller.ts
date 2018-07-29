import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import * as status from 'http-status';
import * as yaml from 'js-yaml';
import { includes } from 'lodash';
import * as toml from 'toml-js';
import { flat2nested, getExt, stripExt } from '../common/utils';
import { EtcdService, IWatchMessage } from '../services/etcd.service';
import { Events, NotifyService } from '../services/notify.service';

@Controller('api')
export class ConfigController {
	private supportExts = ['json', 'yml', 'yaml', 'properties', 'toml'];

	constructor(
		private readonly etcdService: EtcdService,
		private readonly notifyService: NotifyService,
	) {}

	@Get(':appKey/:profileKey')
	public async profile(
		@Query('ver') version: number,
		@Param('appKey') appKey: string,
		@Param('profileKey') profileKey: string,
		@Res() res: Response,
	) {
		const ext = getExt(profileKey);
		if (ext && includes(this.supportExts, ext)) {
			profileKey = stripExt(profileKey);
		}
		const config = await this.etcdService.getConfig(appKey, profileKey);

		if (!config) {
			return res.status(status.NOT_FOUND).json({
				status: status.NOT_FOUND,
				message: 'profile is not found',
			});
		}

		if (ext) {
			// if with extension, download the file
			const data = this.createFileData(config.config, ext);
			res.setHeader(
				'Content-Disposition',
				`form-data; name="fieldName"; filename=${appKey}-${profileKey}.${ext}`,
			);
			res.write(data);
			res.end();
		} else if (version) {
			// immidiately return if version is newer
			if(config.version > version) {
				return res.json(config);
			}

			// hang the connection and waiting for the changes
			const updateHandler = (data: IWatchMessage) => {
				if (
					data.version > version &&
					data.appKey === appKey &&
					data.profileKey === profileKey
				) {
					clearTimeout(timer);
					this.notifyService.removeListener(Events.configDelete, deleteHandler);
					res.json(data);
				}
			};

			const deleteHandler = (data: IWatchMessage) => {
				if (
					data.appKey === appKey &&
					data.profileKey === profileKey
				) {
					clearTimeout(timer);
					this.notifyService.removeListener(Events.configUpdate, updateHandler);
					res.status(status.NOT_FOUND).end();
				}
			};

			const timer = setTimeout(() => {
				this.notifyService.removeListener(Events.configUpdate, updateHandler);
				this.notifyService.removeListener(Events.configDelete, deleteHandler);
				res.status(status.NOT_MODIFIED).end();
			}, 15 * 1000);

			this.notifyService.once(Events.configUpdate, updateHandler);
			this.notifyService.once(Events.configDelete, deleteHandler);
		} else {
			// normal return
			res.json(config);
		}
	}

	private createFileData(config, ext: string) {
		switch (ext) {
			case 'properties':
				return Object.keys(config)
					.map(key => key + '=' + config[key])
					.join('\n');
			case 'toml':
				return toml.dump(flat2nested(config));
			case 'yml':
			case 'yaml':
				return yaml.dump(flat2nested(config));
			case 'json':
			default:
				return JSON.stringify(flat2nested(config));
		}
	}
}
