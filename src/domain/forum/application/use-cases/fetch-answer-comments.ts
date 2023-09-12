import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { IAnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { Either, right } from "@/core/either";

interface IFetchAnswerCommentsUseCaseRequest {
	answerId: string;
	page: number;
}

type FetchAnswerCommentsUseCaseResponse = Either<
	null,
	{
		answerComments: AnswerComment[];
	}
>;

export class FetchAnswerCommentsUseCase {
	constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

	async execute({
		answerId,
		page,
	}: IFetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
		const answerComments =
			await this.answerCommentsRepository.findManyByAnswerId(answerId, {
				page,
			});

		return right({
			answerComments,
		});
	}
}
