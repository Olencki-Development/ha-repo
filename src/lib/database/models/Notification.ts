import { z } from 'zod';
import { baseSchema, stringOrDateAsDate } from './base';

export const notificationSchema = baseSchema.extend({
	notification_id: z.number(),
	title: z.string().min(1),
	body: z.string().min(1).nullable(),
	read_at: stringOrDateAsDate.nullable(),
	data: z.record(z.any())
});
export type INotification = z.infer<typeof notificationSchema>;
