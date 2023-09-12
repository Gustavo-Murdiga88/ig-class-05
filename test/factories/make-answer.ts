import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
	Answer,
	IAnswerProps,
} from "@/domain/forum/enterprise/entities/answer";

export function makeAnswer(
	// eslint-disable-next-line default-param-last
	override: Partial<IAnswerProps> = {},
	id?: UniqueEntityID,
) {
	const answer = Answer.create(
		{
			authorId: new UniqueEntityID(),
			questionId: new UniqueEntityID(),
			content: faker.lorem.text(),
			...override,
		},
		id,
	);

	return answer;
}
