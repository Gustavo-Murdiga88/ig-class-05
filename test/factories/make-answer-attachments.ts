import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import {
	AnswerAttachment,
	IAnswerAttachmentProps,
} from "@/domain/forum/enterprise/entities/answer-attachment";

export function makeAnswerAttachment(
	// eslint-disable-next-line default-param-last
	override: Partial<IAnswerAttachmentProps> = {},
	id?: UniqueEntityID,
) {
	const answerAttachment = AnswerAttachment.create(
		{
			answerId: new UniqueEntityID(),
			attachmentId: new UniqueEntityID(),
			...override,
		},
		id,
	);

	return answerAttachment;
}
