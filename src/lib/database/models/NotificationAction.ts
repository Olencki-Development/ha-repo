import { z } from 'zod';
import { baseSchema } from './base';

export enum ActionType {
	OPEN_URL = 'open_url'
}

const notificationActionBaseSchema = baseSchema.extend({
	notification_action_id: z.number(),
	notification_id: z.number(),
	title: z.string().min(1)
});

export const notificationActionSchema =
	/*z
  .discriminatedUnion("action_type_id", [*/
	notificationActionBaseSchema.extend({
		action_type_id: z.literal(ActionType.OPEN_URL),
		properties: z.object({
			url: z.string()
		})
	});
// ])

export type INotificationAction = z.infer<typeof notificationActionSchema>;
