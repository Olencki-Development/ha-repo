import { z } from 'zod';
import { notificationSchema } from '../../database/models/Notification';
import { notificationActionSchema } from '../../database/models/NotificationAction';

export const notificationWithActionsSchema = notificationSchema.extend({
	actions: z.array(notificationActionSchema)
});

export type INotificationWithActions = z.infer<typeof notificationWithActionsSchema>;
