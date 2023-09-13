import { Module } from "@nestjs/common";
import { AccountsController } from "./controllers/accounts.controller";
import { AuthenticationController } from "./controllers/authentication.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { ListRecentQuestionController } from "./controllers/fetch-recent-questions.controller";
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";
import { DataBaseModule } from "../database/prisma.module";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions";
import { RegisterStudentUseCase } from "@/domain/forum/application/use-cases/register-student";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student";
import { CryptographyModule } from "../criptography/criptography.module";

@Module({
	imports: [DataBaseModule, CryptographyModule],
	controllers: [
		AccountsController,
		AuthenticationController,
		CreateQuestionController,
		ListRecentQuestionController,
	],
	providers: [
		CreateQuestionUseCase,
		FetchRecentQuestionsUseCase,
		RegisterStudentUseCase,
		AuthenticateStudentUseCase,
	],
})
export class HttpModule {}
