import { Question } from "@/domain/forum/enterprise/entities/question";

export class QuestionPresenter {
	static toHTTP(question: Question) {
		return {
			id: question.id.toString(),
			authorId: question.authorId.toValue(),
			slug: question.slug.value,
			title: question.title,
			content: question.content,
			createdAt: question.createdAt,
			updatedAt: question.updatedAt,
			bestAnswer: question.bestAnswerId?.toString(),
		};
	}
}
