import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import {
	QuestionAttachment,
	IQuestionAttachmentProps,
} from "@/domain/forum/enterprise/entities/question-attachment";

export function makeQuestionAttachment(
	// eslint-disable-next-line default-param-last
	override: Partial<IQuestionAttachmentProps> = {},
	id?: UniqueEntityID,
) {
	const questionAttachment = QuestionAttachment.create(
		{
			questionId: new UniqueEntityID(),
			attachmentId: new UniqueEntityID(),
			...override,
		},
		id,
	);

	return questionAttachment;
}
