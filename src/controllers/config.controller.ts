import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
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
			const timer = setTimeout(() => {
				this.notifyService.off(Events.configUpdate, handler);
				res.status(304).end();
			}, 30 * 1000);

			function handler(data: IWatchMessage) {
				if (
					data.version > version &&
					data.appKey === appKey &&
					data.profileKey === profileKey
				) {
					clearTimeout(timer);
					res.json(data.config);
				}
			}
			this.notifyService.on(Events.configUpdate, handler);
		} else {
			const config = await this.etcdService.getConfig(appKey, profileKey);
			res.json(config);
		}
	}
}
