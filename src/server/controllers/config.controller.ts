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
		const supportExts = ['json', 'yml', 'yaml', 'properties', 'toml'];
		const ext = getExt(profileKey);
		if (ext && includes(supportExts, ext)) {
			profileKey = stripExt(profileKey);
		}
		if (version) {
			const handler = (data: IWatchMessage) => {
				if (
					data.version > version &&
					data.appKey === appKey &&
					data.profileKey === profileKey
				) {
					clearTimeout(timer);
					res.json(data);
				}
			};

			const timer = setTimeout(() => {
				this.notifyService.removeListener(Events.configUpdate, handler);
				res.status(status.NO_CONTENT).end();
			}, 15 * 1000);

			this.notifyService.once(Events.configUpdate, handler);
		} else {
			const config = await this.etcdService.getConfig(appKey, profileKey);
			if (!config) {
				res.status(status.NOT_FOUND).json({
					status: status.NOT_FOUND,
					message: 'profile is not found',
				});
			} else if (ext) {
				const data = this.createFileData(config.config, ext);
				res.setHeader(
					'Content-Disposition',
					`form-data; name="fieldName"; filename=${appKey}-${profileKey}.${ext}`,
				);
				res.write(data);
				res.end();
			} else {
				res.json(config);
			}
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
