import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envScheme } from "./env";
import { HttpModule } from "./http/http.module";
import { AuthModule } from "./http/auth/auth.module";
import { EnvModule } from "./env/env.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: "./src/infra/env/.env",
			validate: (env) => envScheme.parse(env),
			isGlobal: true,
		}),
		HttpModule,
		AuthModule,
		EnvModule,
	],
})
export class AppModule {}
