import { Injectable } from "@nestjs/common";
import { EventEmitter } from "events";

export const Events = {
	configUpdate: Symbol.for('config-update'),
	configDelete: Symbol.for('config-delete'),
};

@Injectable()
export class NotifyService extends EventEmitter {

}
