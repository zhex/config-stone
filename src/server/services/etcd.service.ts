import { Injectable } from '@nestjs/common';
import { Etcd3 } from 'etcd3';
import { Events, NotifyService } from './notify.service';

export interface IWatchMessage {
	appKey: string;
	profileKey: string;
	config?: any;
	version?: number;
}

@Injectable()
export class EtcdService {
	private client: Etcd3;
	private readonly prefix = 'config-data';
	private readonly memStorage = new Map<string, any>();

	constructor(private readonly notifyService: NotifyService) {
		const urls = (process.env.ETCD_HOSTS || 'http://localhost:2379');
		this.client = new Etcd3({
			hosts: urls.split(','),
		});
	}

	public setConfig(appKey: string, profileKey: string, value: any) {
		const data =  typeof value === 'string' ? value : JSON.stringify(value);
		const key = this.getConfigKey(appKey, profileKey);
		return this.client.put(key).value(data);
	}

	public async getConfig(appKey: string, profileKey: string) {
		const key = this.getConfigKey(appKey, profileKey);
		if (this.memStorage.has(key)) {
			return this.memStorage.get(key);
		}
		return this.client
			.get(key)
			.exec()
			.then(res => {
				if (!res.kvs.length) {
					return null;
				}
				let config;
				try {
					config = JSON.parse(res.kvs[0].value.toString());
				} catch (err) {
					config = res.kvs[0].value.toString();
				}
				const data = {
					appKey,
					profileKey,
					version: Number(res.kvs[0].version),
					config,
				};
				this.memStorage.set(key, data);
				return data;
			});
	}

	public deleteConfig(appKey: string, profileKey: string) {
		const key = this.getConfigKey(appKey, profileKey);
		if (this.memStorage.has(key)) {
			this.memStorage.delete(key);
		}
		return this.client
			.delete()
			.key(key)
			.exec();
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

			const data = {
				appKey,
				profileKey,
				version: Number(res.version),
				config: JSON.parse(val),
			};

			if (this.memStorage.has(key)) {
				this.memStorage.set(key, data);
			}

			this.notifyService.emit(Events.configUpdate, data);
		});

		watcher.on('delete', res => {
			const key = res.key.toString();
			const [prefix, appKey, profileKey] = key.split('/');
			if (prefix !== this.prefix) {
				return;
			}

			if (this.memStorage.has(key)) {
				this.memStorage.delete(key);
			}

			this.notifyService.emit(Events.configDelete, {
				appKey,
				profileKey,
			});
		});

		return watcher;
	}
}
