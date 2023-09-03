import {
	Body,
	Controller,
	Post,
	UnauthorizedException,
	UsePipes,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipes";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const accountsScheme = z.object({
	email: z.string().email(),
	password: z.string(),
});

interface IBody extends z.infer<typeof accountsScheme> {}

@Controller("/session")
@UsePipes(new ZodValidationPipe(accountsScheme))
export class AuthenticationController {
	constructor(
		private jwt: JwtService,
		private prisma: PrismaService,
	) {}

	@Post()
	async handle(@Body() body: IBody) {
		const { email, password } = body;

		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			throw new UnauthorizedException("email or password is wrong");
		}

		const passwordIsCorrected = compare(password, user.password);

		if (!passwordIsCorrected) {
			throw new UnauthorizedException("email or password is wrong");
		}

		const token = this.jwt.sign({ sub: user.id });
		return {
			acesses_token: token,
		};
	}
}
