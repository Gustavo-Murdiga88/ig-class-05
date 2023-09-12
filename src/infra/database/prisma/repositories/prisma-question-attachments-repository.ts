import { Injectable } from "@nestjs/common";
import { IQuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";

@Injectable()
export class PrismaQuestionsAttachmentsRepository
	implements IQuestionAttachmentsRepository
{
	findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
		throw new Error("Method not implemented.");
	}

	deleteManyByQuestionId(questionId: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
