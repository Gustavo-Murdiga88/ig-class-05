import { hash, compare } from "bcryptjs";
import { HashComparer } from "@/domain/forum/cryptograph/has.comparer";
import { HashGenerator } from "@/domain/forum/cryptograph/hash-generator";

export class BcryptHasher implements HashGenerator, HashComparer {
	private HASH_SALT_LENGTH = 8;

	hash(plain: string): Promise<string> {
		return hash(plain, this.HASH_SALT_LENGTH);
	}

	// eslint-disable-next-line no-shadow
	compare(plain: string, hash: string): Promise<boolean> {
		return compare(plain, hash);
	}
}
