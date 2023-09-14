import { Module } from "@nestjs/common";
import { EnvService } from "./envService";

@Module({
	providers: [EnvService],
	exports: [EnvService],
})
export class EnvModule {}
