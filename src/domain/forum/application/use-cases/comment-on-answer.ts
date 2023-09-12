import { IAnswersRepository } from "../repositories/answers-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";
import { IAnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface ICommentOnAnswerUseCaseRequest {
	authorId: string;
	answerId: string;
	content: string;
}

type CommentOnAnswerUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		answerComment: AnswerComment;
	}
>;

export class CommentOnAnswerUseCase {
	constructor(
		private IanswersRepository: IAnswersRepository,
		private IanswerCommentsRepository: IAnswerCommentsRepository,
	) {}

	async execute({
		authorId,
		answerId,
		content,
	}: ICommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
		const answer = await this.IanswersRepository.findById(answerId);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		const answerComment = AnswerComment.create({
			authorId: new UniqueEntityID(authorId),
			answerId: new UniqueEntityID(answerId),
			content,
		});

		await this.IanswerCommentsRepository.create(answerComment);

		return right({
			answerComment,
		});
	}
}
