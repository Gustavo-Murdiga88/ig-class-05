import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import {
	QuestionComment,
	IQuestionICommentProps,
} from "@/domain/forum/enterprise/entities/question-comment";

export function makeQuestionComment(
	// eslint-disable-next-line default-param-last
	override: Partial<IQuestionICommentProps> = {},
	id?: UniqueEntityID,
) {
	const question = QuestionComment.create(
		{
			authorId: new UniqueEntityID(),
			questionId: new UniqueEntityID(),
			content: faker.lorem.text(),
			...override,
		},
		id,
	);

	return question;
}
