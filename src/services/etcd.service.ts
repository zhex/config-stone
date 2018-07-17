import { Injectable } from '@nestjs/common';
import { Etcd3 } from 'etcd3';
import { NotifyService } from './notify.service';

export interface IWatchMessage {
	appKey: string;
	profileKey: string;
	config: any;
	version: string;
}

@Injectable()
export class EtcdService {
	private client: Etcd3;
	private prefix = 'config-data';

	constructor(private readonly notifyService: NotifyService) {
		this.client = new Etcd3();
	}

	public setConfig(appKey: string, profileKey: string, value: any) {
		const data = JSON.stringify(value);
		const key = this.getConfigKey(appKey, profileKey);
		return this.client.put(key).value(data);
	}

	public getConfig(appKey: string, profileKey: string) {
		const key = this.getConfigKey(appKey, profileKey);
		return this.client.get(key).json();
	}

	public getConfigKey(appKey: string, profileKey: string) {
		return [this.prefix, appKey, profileKey].join('/');
	}

	public async watchConfig() {
		const watcher = await this.client
			.watch()
			.prefix(this.prefix)
			.create();

		watcher.on('put', res => {
			const key = res.key.toString();
			const val = res.value.toString();
			const [prefix, appKey, profileKey] = key.split('/');
			if (prefix !== this.prefix) {
				return;
			}
			this.notifyService.emit(Symbol.for('config-update'), {
				appKey,
				profileKey,
				version: res.version,
				config: JSON.parse(val),
			});
		});
	}
}
