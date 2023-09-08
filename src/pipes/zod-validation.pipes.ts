import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export class ZodValidationPipe implements PipeTransform {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(private schema: any) {}

	transform(value: unknown) {
		try {
			this.schema.parse(value);
		} catch (error) {
			if (error instanceof ZodError) {
				throw new BadRequestException({
					error: fromZodError(error),
					message: "Validation failed",
					status: 400,
				});
			}

			throw new BadRequestException("Validation failed");
		}
		return value;
	}
}
