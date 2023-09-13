import { Injectable } from "@nestjs/common";
import { Either, left, right } from "@/core/either";
import { StudentsRepository } from "../repositories/students-repository";
import { HashComparer } from "../../cryptograph/has.comparer";
import { Encrypter } from "../../cryptograph/encrypter";
import { WrongCredentialsError } from "./errors/wrong-credentials-errors";

interface IAuthenticateStudentUseCaseRequest {
	email: string;
	password: string;
}

type AuthenticateStudentUseCaseResponse = Either<
	WrongCredentialsError,
	{
		accessToken: string;
	}
>;

@Injectable()
export class AuthenticateStudentUseCase {
	constructor(
		private studentsRepository: StudentsRepository,
		private hashComparer: HashComparer,
		private encrypter: Encrypter,
	) {}

	async execute({
		email,
		password,
	}: IAuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
		const student = await this.studentsRepository.findByEmail(email);

		if (!student) {
			return left(new WrongCredentialsError());
		}

		const isPasswordValid = await this.hashComparer.compare(
			password,
			student.password,
		);

		if (!isPasswordValid) {
			return left(new WrongCredentialsError());
		}

		const accessToken = await this.encrypter.encrypt({
			sub: student.id.toString(),
		});

		return right({
			accessToken,
		});
	}
}
