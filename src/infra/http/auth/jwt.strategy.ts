import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { z } from "zod";
import { EnvService } from "@/infra/env/envService";

const UserPayload = z.object({
	sub: z.string().uuid(),
});

export type UserPayloadProps = z.infer<typeof UserPayload>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(config: EnvService) {
		const publicKey = config.get("JWT_PUBLIC_KEY");

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
