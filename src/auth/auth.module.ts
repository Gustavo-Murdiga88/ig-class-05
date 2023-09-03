import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { PassportModule } from "@nestjs/passport";
import { Env } from "src/env";

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			global: true,
			inject: [ConfigService],
			useFactory: (config: ConfigService<Env, true>) => {
				const private_key = config.get("JWT_PRIVATE_KEY", { infer: true });
				const public_key = config.get("JWT_PUBLIC_KEY", { infer: true });

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
})
export class AuthModule {}
