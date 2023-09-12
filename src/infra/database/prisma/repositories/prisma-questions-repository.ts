import { Injectable } from "@nestjs/common";
import { IPaginationParams } from "@/core/repositories/pagination-params";
import { IQuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { PrismaService } from "../prisma.service";
import { PrismaQuestionMapper } from "../mappers/prisma-questions-mapper";

@Injectable()
export class PrismaQuestionsRepository implements IQuestionsRepository {
	constructor(private prismaService: PrismaService) {}

	async findById(id: string): Promise<Question | null> {
		const question = await this.prismaService.question.findUnique({
			where: {
				id,
			},
		});

		if (!question) {
			return null;
		}

		return PrismaQuestionMapper.toDomain(question);
	}

	async findBySlug(slug: string): Promise<Question | null> {
		const question = await this.prismaService.question.findUnique({
			where: {
				slug,
			},
		});

		if (!question) {
			return null;
		}

		return PrismaQuestionMapper.toDomain(question);
	}

	async findManyRecent({ page }: IPaginationParams): Promise<Question[]> {
		const recent = await this.prismaService.question.findMany({
			take: 20,
			skip: (page - 1) * 20,
		});

		return recent.map(PrismaQuestionMapper.toDomain);
	}

	async save(question: Question): Promise<void> {
		const data = PrismaQuestionMapper.toPrisma(question);

		await this.prismaService.question.update({
			data,
			where: {
				id: data.id,
			},
		});
	}

	async create(question: Question): Promise<void> {
		const data = PrismaQuestionMapper.toPrisma(question);

		await this.prismaService.question.create({
			data,
		});
	}

	async delete(question: Question): Promise<void> {
		const data = PrismaQuestionMapper.toPrisma(question);

		await this.prismaService.question.delete({
			where: {
				id: data.id,
			},
		});
	}
}
