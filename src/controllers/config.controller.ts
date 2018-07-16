import { Controller, Get } from "@nestjs/common";

@Controller('api')
export class ConfigController {
	@Get(':appKey/:profileKey')
	public profile() {
		return {};
	}
}
