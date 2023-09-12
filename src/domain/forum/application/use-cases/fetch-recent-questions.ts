import { Injectable } from "@nestjs/common";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { IQuestionsRepository } from "../repositories/questions-repository";
import { Either, right } from "@/core/either";

interface IFetchRecentQuestionsUseCaseRequest {
	page: number;
}

type FetchRecentQuestionsUseCaseResponse = Either<
	null,
	{
		questions: Question[];
	}
>;
@Injectable()
export class FetchRecentQuestionsUseCase {
	constructor(private questionsRepository: IQuestionsRepository) {}

	async execute({
		page,
	}: IFetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
		const questions = await this.questionsRepository.findManyRecent({ page });

		return right({
			questions,
		});
	}
}
