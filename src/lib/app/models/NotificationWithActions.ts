import { z } from 'zod';
import { Notification } from '../../database/models/Notification';
import { ActionType, NotificationAction } from '../../database/models/NotificationAction';

export const NotificationWithActions = Notification.extend({
	notification_id: Notification.shape.notification_id.optional(),
	read_at: Notification.shape.read_at.optional(),
	created_at: Notification.shape.created_at.optional(),
	updated_at: Notification.shape.created_at.optional(),
	actions: z.array(
		NotificationAction.extend({
			notification_action_id: NotificationAction.shape.notification_action_id.optional(),
			created_at: NotificationAction.shape.created_at.optional(),
			updated_at: NotificationAction.shape.created_at.optional()
		}).omit({ notification_id: true })
	)
});

export type NotificationWithActions = z.infer<typeof NotificationWithActions>;
