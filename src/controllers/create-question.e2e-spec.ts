import request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "@/app.module";

describe("Questions", () => {
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

	it(`/POST questions`, async () => {
		await request(app.getHttpServer()).post("/accounts").send({
			name: "John Doe",
			email: "email@email.com",
			password: "123456",
		});

		const {
			body: { access_token },
		} = await request(app.getHttpServer()).post("/session").send({
			email: "email@email.com",
			password: "123456",
		});

		await request(app.getHttpServer())
			.post("/questions")
			.set("Authorization", `Bearer ${access_token}`)
			.send({
				content: "content test",
				title: "title test",
			})
			.expect(201);
	});
});
