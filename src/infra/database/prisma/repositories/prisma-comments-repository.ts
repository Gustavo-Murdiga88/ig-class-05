import { Injectable } from "@nestjs/common";
import { IPaginationParams } from "@/core/repositories/pagination-params";
import { IQuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

@Injectable()
export class PrismaCommentsRepository implements IQuestionCommentsRepository {
	findById(id: string): Promise<QuestionComment | null> {
		throw new Error("Method not implemented.");
	}

	findManyByQuestionId(
		questionId: string,
		params: IPaginationParams,
	): Promise<QuestionComment[]> {
		throw new Error("Method not implemented.");
	}

	create(questionComment: QuestionComment): Promise<void> {
		throw new Error("Method not implemented.");
	}

	delete(questionComment: QuestionComment): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
