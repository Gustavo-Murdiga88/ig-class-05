import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import {
	AnswerComment,
	IAnswerICommentProps,
} from "@/domain/forum/enterprise/entities/answer-comment";

export function makeAnswerComment(
	// eslint-disable-next-line default-param-last
	override: Partial<IAnswerICommentProps> = {},
	id?: UniqueEntityID,
) {
	const answer = AnswerComment.create(
		{
			authorId: new UniqueEntityID(),
			answerId: new UniqueEntityID(),
			content: faker.lorem.text(),
			...override,
		},
		id,
	);

	return answer;
}
