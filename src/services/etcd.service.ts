import { Injectable } from '@nestjs/common';
import { Etcd3 } from 'etcd3';

@Injectable()
export class EtcdService {
	private client: Etcd3;

	constructor() {
		this.client = new Etcd3()
	}

	public set(key: string, value: string) {
		return this.client.put(key).value(value);
	}
}
