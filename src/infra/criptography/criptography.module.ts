import { Module } from "@nestjs/common";
import { Encrypter } from "@/domain/forum/cryptograph/encrypter";
import { HashComparer } from "@/domain/forum/cryptograph/has.comparer";
import { HashGenerator } from "@/domain/forum/cryptograph/hash-generator";
import { JwtEncrypter } from "./jwt-encrypter";
import { BcryptHasher } from "./bcrypt-haser";

@Module({
	providers: [
		{ provide: Encrypter, useClass: JwtEncrypter },
		{ provide: HashComparer, useClass: BcryptHasher },
		{ provide: HashGenerator, useClass: BcryptHasher },
	],
	exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
