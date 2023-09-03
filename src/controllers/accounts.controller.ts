import {
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Post,
	UsePipes,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { z } from "zod";

import { hash } from "bcryptjs";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipes";

const accountsScheme = z.object({
	email: z.string().email(),
	name: z.string(),
	password: z.string(),
});

interface IBody extends z.infer<typeof accountsScheme> {}

@Controller("/accounts")
export class AccountsController {
	constructor(private prisma: PrismaService) {}

	@Post()
	@HttpCode(201)
	@UsePipes(new ZodValidationPipe(accountsScheme))
	async handle(@Body() body: IBody) {
		const { email, name, password } = body;

		const userAlreadyExits = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (userAlreadyExits) {
			throw new ConflictException({
				message: "Same user with email already exits",
				code: 409,
			});
		}

		const passowrdHash = await hash(password, 8);

		await this.prisma.user.create({
			data: {
				email,
				name,
				password: passowrdHash,
			},
		});

		return {
			message: "User created",
			code: 201,
		};
	}
}
