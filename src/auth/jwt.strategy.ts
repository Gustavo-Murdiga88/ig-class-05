import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { z } from "zod";
import { Env } from "@/env";

const UserPayload = z.object({
	sub: z.string().uuid(),
});

export type UserPayloadProps = z.infer<typeof UserPayload>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(config: ConfigService<Env, true>) {
		const publicKey = config.get("JWT_PUBLIC_KEY", { infer: true });

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			algorithms: ["RS256"],
			secretOrKey: Buffer.from(publicKey, "base64"),
		});
	}

	async validate(payload: UserPayloadProps) {
		return UserPayload.parse(payload);
	}
}
