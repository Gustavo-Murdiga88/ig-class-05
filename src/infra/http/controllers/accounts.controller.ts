import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Post,
	UsePipes,
} from "@nestjs/common";

import { z } from "zod";

import { hash } from "bcryptjs";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { ZodValidationPipe } from "../pipes/zod-validation.pipes";
import { RegisterStudentUseCase } from "@/domain/forum/application/use-cases/register-student";
import { StudentAlreadyExistsError } from "@/domain/forum/application/use-cases/errors/student-already-exists";
import { Public } from "../auth/public";

const accountsScheme = z.object({
	email: z.string().email(),
	name: z.string(),
	password: z.string(),
});

interface IBody extends z.infer<typeof accountsScheme> {}

@Controller("/accounts")
export class AccountsController {
	constructor(private registerStudent: RegisterStudentUseCase) {}

	@Public()
	@Post()
	@HttpCode(201)
	@UsePipes(new ZodValidationPipe(accountsScheme))
	async handle(@Body() body: IBody) {
		const { email, name, password } = body;

		const result = await this.registerStudent.execute({
			email,
			name,
			password,
		});

		if (result.isLeft()) {
			const error = result.value;

			switch (error.constructor) {
				case StudentAlreadyExistsError:
					throw new ConflictException(error.message);
				default:
					throw new BadRequestException(error.message);
			}
		}

		return {};
	}
}
