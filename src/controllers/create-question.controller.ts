import { Controller, Post, UseGuards, Body } from "@nestjs/common";
import { z } from "zod";
import { CurrentUser } from "@/auth/current_user_decorator";
import { JwtAuthGuard } from "@/auth/jwt.guard";
import { UserPayloadProps } from "@/auth/jwt.strategy";
import { ZodValidationPipe } from "@/pipes/zod-validation.pipes";
import { PrismaService } from "@/prisma/prisma.service";

const questionBodyScheme = z.object({
	title: z.string(),
	content: z.string(),
});

type QuestionBodyScheme = z.infer<typeof questionBodyScheme>;

const zodValidationPipe = new ZodValidationPipe(questionBodyScheme);

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
	constructor(private prisma: PrismaService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	async handle(
		@Body(zodValidationPipe) body: QuestionBodyScheme,
		@CurrentUser() user: UserPayloadProps,
	) {
		const { content, title } = body;
		const userId = user.sub;

		const slug = this.convertToSlug(title);

		await this.prisma.question.create({
			data: {
				content,
				slug,
				title,
				authorId: userId,
			},
		});
	}

	private convertToSlug(title: string): string {
		return title
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^\w\s-]/g, "")
			.replace(/\s+/g, "-");
	}
}
