import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { PassportModule } from "@nestjs/passport";
import { APP_GUARD } from "@nestjs/core";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./JwtAuthGuard";
import { EnvService } from "@/infra/env/envService";
import { EnvModule } from "@/infra/env/env.module";

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			global: true,
			imports: [EnvModule],
			inject: [EnvService],
			useFactory: (config: EnvService) => {
				const private_key = config.get("JWT_PRIVATE_KEY");
				const public_key = config.get("JWT_PUBLIC_KEY");

				return {
					signOptions: {
						algorithm: "RS256",
					},
					privateKey: Buffer.from(private_key, "base64"),
					publicKey: Buffer.from(public_key, "base64"),
				};
			},
		}),
	],
	providers: [
		JwtStrategy,
		EnvService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AuthModule {}
