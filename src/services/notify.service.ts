import { Injectable } from "@nestjs/common";
import { EventEmitter } from "events";

@Injectable()
export class NotifyService extends EventEmitter {

}
