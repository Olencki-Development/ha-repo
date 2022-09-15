import { z } from 'zod';
import { baseSchema } from './base';

export enum ActionType {
	OPEN_URL = 'open_url'
}

const NotificationActionBase = baseSchema.extend({
	notification_action_id: z.number(),
	notification_id: z.number(),
	title: z.string().min(1)
});

export const NotificationAction =
	/*z
  .discriminatedUnion("action_type_id", [*/
	NotificationActionBase.extend({
		action_type_id: z.literal(ActionType.OPEN_URL),
		properties: z.object({
			url: z.string()
		})
	});
// ])

export type NotificationAction = z.infer<typeof NotificationAction>;
