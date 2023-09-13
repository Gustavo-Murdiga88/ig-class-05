import { Encrypter } from "@/domain/forum/cryptograph/encrypter";

export class FakeEncrypter implements Encrypter {
	async encrypt(payload: Record<string, unknown>): Promise<string> {
		return JSON.stringify(payload);
	}
}
