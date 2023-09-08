import request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "@/app.module";

describe("Recent questions", () => {
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

	it(`/GET Recent questions`, async () => {
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
			});

		const {
			body: { questions },
		} = await request(app.getHttpServer())
			.get("/questions?page=1")
			.set("Authorization", `Bearer ${access_token}`);

		expect(questions).toEqual([
			expect.objectContaining({
				slug: expect.any(String),
			}),
		]);
	});
});
