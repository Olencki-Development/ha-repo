import { z } from 'zod';

export const stringOrDateAsDate = z.preprocess((v) => {
	if (typeof v === 'string') {
		return new Date(v);
	}
	return v;
}, z.date());

export const baseSchema = z.object({
	created_at: stringOrDateAsDate,
	updated_at: stringOrDateAsDate
});
