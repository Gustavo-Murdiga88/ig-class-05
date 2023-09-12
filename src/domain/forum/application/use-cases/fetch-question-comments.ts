import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import { IQuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { Either, right } from "@/core/either";

interface IFetchQuestionCommentsUseCaseRequest {
	questionId: string;
	page: number;
}

type FetchQuestionCommentsUseCaseResponse = Either<
	null,
	{
		questionComments: QuestionComment[];
	}
>;

export class FetchQuestionCommentsUseCase {
	constructor(
		private questionCommentsRepository: IQuestionCommentsRepository,
	) {}

	async execute({
		questionId,
		page,
	}: IFetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
		const questionComments =
			await this.questionCommentsRepository.findManyByQuestionId(questionId, {
				page,
			});

		return right({
			questionComments,
		});
	}
}
