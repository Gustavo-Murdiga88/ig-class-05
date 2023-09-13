import { FakeHasher } from "test/criptography/faker-haser";
import { FakeEncrypter } from "test/criptography/faker-incripter";
import { makeStudent } from "test/factories/make-student";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-studants-repository";
import { AuthenticateStudentUseCase } from "./authenticate-student";

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let encrypter: FakeEncrypter;

let sut: AuthenticateStudentUseCase;

describe("Authenticate Student", () => {
	beforeEach(() => {
		inMemoryStudentsRepository = new InMemoryStudentsRepository();
		fakeHasher = new FakeHasher();
		encrypter = new FakeEncrypter();

		sut = new AuthenticateStudentUseCase(
			inMemoryStudentsRepository,
			fakeHasher,
			encrypter,
		);
	});

	it("should be able to authenticate a student", async () => {
		const student = makeStudent({
			email: "johndoe@example.com",
			password: await fakeHasher.hash("123456"),
		});

		inMemoryStudentsRepository.items.push(student);

		const result = await sut.execute({
			email: "johndoe@example.com",
			password: "123456",
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual({
			accessToken: expect.any(String),
		});
	});
});