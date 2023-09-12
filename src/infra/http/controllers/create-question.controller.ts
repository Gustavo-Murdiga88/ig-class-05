import { Controller, Post, UseGuards, Body } from "@nestjs/common";
import { z } from "zod";
import { CurrentUser } from "@/infra/http/auth/current_user_decorator";
import { JwtAuthGuard } from "@/infra/http/auth/jwt.guard";
import { UserPayloadProps } from "@/infra/http/auth/jwt.strategy";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation.pipes";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";

const questionBodyScheme = z.object({
	title: z.string(),
	content: z.string(),
});

type QuestionBodyScheme = z.infer<typeof questionBodyScheme>;

const zodValidationPipe = new ZodValidationPipe(questionBodyScheme);

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
	constructor(private createQuestionUseCase: CreateQuestionUseCase) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	async handle(
		@Body(zodValidationPipe) body: QuestionBodyScheme,
		@CurrentUser() user: UserPayloadProps,
	) {
		const { content, title } = body;
		const userId = user.sub;

		await this.createQuestionUseCase.execute({
			content,
			attachmentsIds: [],
			title,
			authorId: userId,
		});
	}
}
