import { z } from 'zod';
import { notificationSchema } from '../../database/models/Notification';
import { notificationActionSchema } from '../../database/models/NotificationAction';

export const notificationWithActionsSchema = notificationSchema.extend({
	notification_id: notificationSchema.shape.notification_id.optional(),
	actions: z.array(
		notificationActionSchema
			.extend({
				notification_action_id: notificationActionSchema.shape.notification_action_id.optional()
			})
			.omit({ notification_id: true })
	)
});

export type INotificationWithActions = z.infer<typeof notificationWithActionsSchema>;
