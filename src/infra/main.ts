import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { EnvService } from "./env/envService";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		// logger: false
	});

	const configService = app.get(EnvService);

	const PORT = configService.get("PORT");

	await app.listen(PORT);
}
bootstrap();
