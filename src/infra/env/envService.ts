import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { Env } from "../env";

@Injectable()
export class EnvService {
	constructor(private configService: ConfigService) {}

	get<T extends keyof Env>(key: T) {
		return this.configService.get<Env>(key, { infer: true });
	}
}
