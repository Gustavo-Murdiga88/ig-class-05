import { Question } from "@/domain/forum/enterprise/entities/question";
import { IQuestionsRepository } from "../repositories/questions-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface IGetQuestionBySlugUseCaseRequest {
	slug: string;
}

type GetQuestionBySlugUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		question: Question;
	}
>;

export class GetQuestionBySlugUseCase {
	constructor(private questionsRepository: IQuestionsRepository) {}

	async execute({
		slug,
	}: IGetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
		const question = await this.questionsRepository.findBySlug(slug);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		return right({
			question,
		});
	}
}
