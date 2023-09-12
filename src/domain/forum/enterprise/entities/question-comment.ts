import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { Comment, ICommentProps } from "./comment";

export interface IQuestionICommentProps extends ICommentProps {
	questionId: UniqueEntityID;
}

export class QuestionComment extends Comment<IQuestionICommentProps> {
	get questionId() {
		return this.props.questionId;
	}

	static create(
		props: Optional<IQuestionICommentProps, "createdAt">,
		id?: UniqueEntityID,
	) {
		const questionComment = new QuestionComment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return questionComment;
	}
}
