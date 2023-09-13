import { Injectable } from "@nestjs/common";
import { Either, left, right } from "@/core/either";
import { Student } from "../../enterprise/entities/student";
import { StudentAlreadyExistsError } from "./errors/student-already-exists";
import { StudentsRepository } from "../repositories/students-repository";
import { HashGenerator } from "../../cryptograph/hash-generator";

interface IRegisterStudentUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

type RegisterStudentUseCaseResponse = Either<
	StudentAlreadyExistsError,
	{
		student: Student;
	}
>;

@Injectable()
export class RegisterStudentUseCase {
	constructor(
		private studentsRepository: StudentsRepository,
		private hashGenerator: HashGenerator,
	) {}

	async execute({
		name,
		email,
		password,
	}: IRegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
		const studentWithSameEmail =
			await this.studentsRepository.findByEmail(email);

		if (studentWithSameEmail) {
			return left(new StudentAlreadyExistsError(email));
		}

		const hashedPassword = await this.hashGenerator.hash(password);

		const student = Student.create({
			name,
			email,
			password: hashedPassword,
		});

		await this.studentsRepository.create(student);

		return right({
			student,
		});
	}
}
