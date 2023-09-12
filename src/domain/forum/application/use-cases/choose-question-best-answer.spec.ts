import { InMemoryIAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";
import { InMemoryIQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { ChooseQuestionBestAnswerUseCase } from "@/domain/forum/application/use-cases/choose-question-best-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryIQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryIAnswersRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question Best Answer", () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository =
			new InMemoryAnswerAttachmentsRepository();
		inMemoryQuestionAttachmentsRepository =
			new InMemoryIQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);
		inMemoryAnswersRepository = new InMemoryIAnswersRepository(
			inMemoryAnswerAttachmentsRepository,
		);

		sut = new ChooseQuestionBestAnswerUseCase(
			inMemoryQuestionsRepository,
			inMemoryAnswersRepository,
		);
	});

	it("should be able to choose the question best answer", async () => {
		const question = makeQuestion();

		const answer = makeAnswer({
			questionId: question.id,
		});

		await inMemoryQuestionsRepository.create(question);
		await inMemoryAnswersRepository.create(answer);

		await sut.execute({
			answerId: answer.id.toString(),
			authorId: question.authorId.toString(),
		});

		expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
			answer.id,
		);
	});

	it("should not be able to to choose another user question best answer", async () => {
		const question = makeQuestion({
			authorId: new UniqueEntityID("author-1"),
		});

		const answer = makeAnswer({
			questionId: question.id,
		});

		await inMemoryQuestionsRepository.create(question);
		await inMemoryAnswersRepository.create(answer);

		const result = await sut.execute({
			answerId: answer.id.toString(),
			authorId: "author-2",
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
