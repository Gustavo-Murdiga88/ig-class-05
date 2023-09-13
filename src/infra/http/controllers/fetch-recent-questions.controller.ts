import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation.pipes";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions";
import { QuestionPresenter } from "../presenters/questions-presenter";

const pageQueryParamsScheme = z
	.string()
	.optional()
	.default("1")
	.transform(Number)
	.pipe(z.number().min(1));

type PageQueryParamsProps = z.infer<typeof pageQueryParamsScheme>;

const pageQueryValidationPipe = new ZodValidationPipe(pageQueryParamsScheme);

@Controller("/questions")
export class ListRecentQuestionController {
	constructor(private fetchRecentQuestion: FetchRecentQuestionsUseCase) {}

	@Get()
	async handle(
		@Query("page", pageQueryValidationPipe) page: PageQueryParamsProps,
	) {
		const result = await this.fetchRecentQuestion.execute({
			page,
		});

		if (result.isLeft()) {
			throw new BadRequestException();
		}

		const questions = result.value.questions.map(QuestionPresenter.toHTTP);

		return {
			questions,
		};
	}
}
