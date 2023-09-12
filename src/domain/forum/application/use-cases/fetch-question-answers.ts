import { Either, right } from "@/core/either";
import { IAnswersRepository } from "../repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

interface IFetchQuestionAnswersUseCaseRequest {
	questionId: string;
	page: number;
}

type FetchQuestionAnswersUseCaseResponse = Either<
	null,
	{
		answers: Answer[];
	}
>;

export class FetchQuestionAnswersUseCase {
	constructor(private answersRepository: IAnswersRepository) {}

	async execute({
		questionId,
		page,
	}: IFetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
		const answers = await this.answersRepository.findManyByQuestionId(
			questionId,
			{ page },
		);

		return right({
			answers,
		});
	}
}
