import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { Comment, ICommentProps } from "./comment";

export interface IAnswerICommentProps extends ICommentProps {
	answerId: UniqueEntityID;
}

export class AnswerComment extends Comment<IAnswerICommentProps> {
	get answerId() {
		return this.props.answerId;
	}

	static create(
		props: Optional<IAnswerICommentProps, "createdAt">,
		id?: UniqueEntityID,
	) {
		const answerComment = new AnswerComment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return answerComment;
	}
}
