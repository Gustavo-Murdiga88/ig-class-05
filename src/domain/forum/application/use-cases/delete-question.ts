import { Either, left, right } from "@/core/either";
import { IQuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

interface IDeleteQuestionUseCaseRequest {
	authorId: string;
	questionId: string;
}

type DeleteQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	null
>;
export class DeleteQuestionUseCase {
	constructor(private questionsRepository: IQuestionsRepository) {}

	async execute({
		questionId,
		authorId,
	}: IDeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedError());
		}

		await this.questionsRepository.delete(question);

		return right(null);
	}
}
