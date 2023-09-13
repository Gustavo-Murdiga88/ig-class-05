import {
	BadRequestException,
	Body,
	Controller,
	Post,
	UnauthorizedException,
	UsePipes,
} from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation.pipes";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student";
import { WrongCredentialsError } from "@/domain/forum/application/use-cases/errors/wrong-credentials-errors";
import { Public } from "../auth/public";

const accountsScheme = z.object({
	email: z.string().email(),
	password: z.string(),
});

interface IBody extends z.infer<typeof accountsScheme> {}

@Public()
@Controller("/session")
@UsePipes(new ZodValidationPipe(accountsScheme))
export class AuthenticationController {
	constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

	@Post()
	async handle(@Body() body: IBody) {
		const { email, password } = body;

		const result = await this.authenticateStudent.execute({
			email,
			password,
		});

		if (result.isLeft()) {
			const error = result.value;

			switch (error.constructor) {
				case WrongCredentialsError:
					throw new UnauthorizedException(error.message);
				default:
					throw new BadRequestException(error.message);
			}
		}

		const { accessToken } = result.value;

		return {
			access_token: accessToken,
		};
	}
}
