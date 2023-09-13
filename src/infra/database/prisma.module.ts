import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments-repositoiry";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answer-comments-repository";
import { PrismaAnswerRepository } from "./prisma/repositories/prisma-answer-repository";
import { PrismaCommentsRepository } from "./prisma/repositories/prisma-comments-repository";
import { PrismaQuestionsAttachmentsRepository } from "./prisma/repositories/prisma-question-attachments-repository";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository";
import { IQuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { StudentsRepository } from "@/domain/forum/application/repositories/students-repository";
import { PrismaStudentsRepository } from "./prisma/repositories/prisma-studant-repository";

@Module({
	providers: [
		PrismaService,
		PrismaAnswerAttachmentsRepository,
		PrismaAnswerCommentsRepository,
		PrismaAnswerRepository,
		PrismaCommentsRepository,
		PrismaQuestionsAttachmentsRepository,
		{
			provide: IQuestionsRepository,
			useClass: PrismaQuestionsRepository,
		},
		{
			provide: StudentsRepository,
			useClass: PrismaStudentsRepository,
		},
	],
	exports: [
		PrismaService,
		StudentsRepository,
		PrismaAnswerAttachmentsRepository,
		PrismaAnswerCommentsRepository,
		PrismaAnswerRepository,
		PrismaCommentsRepository,
		PrismaQuestionsAttachmentsRepository,
		IQuestionsRepository,
	],
})
export class DataBaseModule {}
