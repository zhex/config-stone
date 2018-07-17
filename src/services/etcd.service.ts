import { Injectable } from '@nestjs/common';
import { Etcd3 } from 'etcd3';

@Injectable()
export class EtcdService {
	private client: Etcd3;

	constructor() {
		this.client = new Etcd3()
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
		return `config-data/${appKey}/${profileKey}`;
	}
}
