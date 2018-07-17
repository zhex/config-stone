import { Controller, Get, Param } from '@nestjs/common';
import { EtcdService } from '../services/etcd.service';

@Controller('api')
export class ConfigController {
	constructor(private readonly etcdService: EtcdService){}

	@Get(':appKey/:profileKey')
	public async profile(
		@Param('appKey') appKey: string,
		@Param('profileKey') profileKey: string,
	) {
		return this.etcdService.getConfig(appKey, profileKey);
	}
}
