import { z } from 'zod';
import { Notification } from '../../database/models/Notification';
import { NotificationAction } from '../../database/models/NotificationAction';

export const NotificationWithActions = Notification.extend({
	notification_id: Notification.shape.notification_id.optional(),
	actions: z.array(
		NotificationAction.extend({
			notification_action_id: NotificationAction.shape.notification_action_id.optional()
		}).omit({ notification_id: true })
	)
});

export type NotificationWithActions = z.infer<typeof NotificationWithActions>;
