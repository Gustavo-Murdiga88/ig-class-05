import request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "@/app.module";

describe("Accounts", () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it(`/POST Accounts`, async () => {
		await request(app.getHttpServer())
			.post("/accounts")
			.send({
				name: "John Doe",
				email: "email@email.com",
				password: "123456",
			})
			.expect(201);
	});
});
