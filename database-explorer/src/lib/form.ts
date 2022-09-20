import { z, ZodError } from 'zod';

export type FormErrors<T> = z.typeToFlattenedError<T> | Error;

export type FormResult<T extends z.SomeZodObject> =
	| {
			status: 'success';
			values: z.infer<T>;
	  }
	| {
			status: 'error';
			errors: FormErrors<z.infer<T>>;
	  };

export function validateForm<T extends z.SomeZodObject>(schema: T, values: any): FormResult<T> {
	try {
		const result = schema.parse(values);
		return {
			status: 'success',
			values: result
		};
	} catch (e) {
		if (e instanceof ZodError) {
			return {
				status: 'error',
				errors: e.flatten()
			};
		} else if (e instanceof Error) {
			return {
				status: 'error',
				errors: e
			};
		}

		return {
			status: 'error',
			errors: new Error('Unknown error has occured.')
		};
	}
}

export function getFieldError<T, F>(
	errors: FormErrors<T> | null | undefined = null,
	field: T extends any ? keyof T : never
) {
	if (errors && !(errors instanceof Error)) {
		if (errors.fieldErrors[field]) {
			return errors.fieldErrors[field];
		}
	}
	return undefined;
}
export function hasFieldError<T>(
	errors: FormErrors<T> | null | undefined = null,
	field: T extends any ? keyof T : never
): boolean {
	const error = getFieldError(errors, field);
	return !!error;
}
