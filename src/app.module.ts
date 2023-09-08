import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationController } from "@/controllers/authentication.controller";
import { PrismaService } from "./prisma/prisma.service";
import { AccountsController } from "./controllers/accounts.controller";
import { envScheme } from "./env";
import { AuthModule } from "./auth/auth.module";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { ListRecentQuestionController } from "./controllers/fetch-recent-questions.controller";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env",
			validate: (env) => envScheme.parse(env),
			isGlobal: true,
		}),
		AuthModule,
	],
	controllers: [
		AccountsController,
		AuthenticationController,
		CreateQuestionController,
		ListRecentQuestionController,
	],
	providers: [PrismaService],
})
export class AppModule {}
