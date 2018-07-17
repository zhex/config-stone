import { Injectable } from "@nestjs/common";
import { EventEmitter } from "events";

export const Events = {
	configUpdate: Symbol.for('config-update'),
};

@Injectable()
export class NotifyService extends EventEmitter {

}
