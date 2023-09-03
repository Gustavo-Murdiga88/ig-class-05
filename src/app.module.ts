import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationController } from "src/controllers/authentication.controller";
import { PrismaService } from "./prisma/prisma.service";
import { AccountsController } from "./controllers/accounts.controller";
import { envScheme } from "./env";
import { AuthModule } from "./auth/auth.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envScheme.parse(env),
			isGlobal: true,
		}),
		AuthModule,
	],
	controllers: [AccountsController, AuthenticationController],
	providers: [PrismaService],
})
export class AppModule {}
