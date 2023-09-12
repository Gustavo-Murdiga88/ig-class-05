import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envScheme } from "./env";
import { HttpModule } from "./http/http.module";
import { AuthModule } from "./http/auth/auth.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env",
			validate: (env) => envScheme.parse(env),
			isGlobal: true,
		}),
		HttpModule,
		AuthModule,
	],
})
export class AppModule {}
