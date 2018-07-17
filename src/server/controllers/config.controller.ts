import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import * as status from 'http-status';
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
		@Query('ver') version: string,
		@Param('appKey') appKey: string,
		@Param('profileKey') profileKey: string,
		@Res() res: Response,
	) {
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
			} else {
				res.json(config);
			}
		}
	}
}
