import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { z } from "zod";
import { JwtAuthGuard } from "@/auth/jwt.guard";
import { ZodValidationPipe } from "@/pipes/zod-validation.pipes";
import { PrismaService } from "@/prisma/prisma.service";

const pageQueryParamsScheme = z
	.string()
	.optional()
	.default("1")
	.transform(Number)
	.pipe(z.number().min(1));

type PageQueryParamsProps = z.infer<typeof pageQueryParamsScheme>;

const pageQueryValidationPipe = new ZodValidationPipe(pageQueryParamsScheme);

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class ListRecentQuestionController {
	constructor(private prisma: PrismaService) {}

	@Get()
	async handle(
		@Query("page", pageQueryValidationPipe) page: PageQueryParamsProps,
	) {
		const perPage = 20;

		const questions = await this.prisma.question.findMany({
			take: perPage,
			skip: (page - 1) * perPage,
		});

		return {
			questions,
		};
	}
}
