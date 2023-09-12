import { Prisma, Question as PrismaClient } from "@prisma/client";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export class PrismaQuestionMapper {
	static toDomain(raw: PrismaClient): Question {
		return Question.create(
			{
				authorId: new UniqueEntityID(raw.authorId),
				content: raw.content,
				title: raw.title,
				slug: Slug.create(raw.slug),
				bestAnswerId: raw.bestAnswerId
					? new UniqueEntityID(raw.bestAnswerId)
					: null,
				attachments: undefined,
				createdAt: raw.createdAt,
				updatedAt: undefined,
			},
			new UniqueEntityID(raw.id),
		);
	}

	static toPrisma(raw: Question): Prisma.QuestionUncheckedCreateInput {
		return {
			authorId: raw.authorId.toString(),
			content: raw.content,
			slug: raw.slug.value,
			title: raw.title,
			updatedAt: raw.updatedAt,
			createdAt: raw.createdAt,
			id: raw.id.toValue(),
			bestAnswerId: raw.bestAnswerId?.toValue(),
		};
	}
}
