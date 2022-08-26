import type { LayoutLoad } from './$types';
import { notifications } from '$stores/notifications';
import type { INotificationWithActions } from '$lib/app/models/NotificationWithActions';
import {
	notificationActionSchema,
	type INotificationAction
} from '$lib/database/models/NotificationAction';
import { notificationSchema } from '$lib/database/models/Notification';

export const load: LayoutLoad = function ({ data }) {
	const actionMap: Record<INotificationAction['notification_id'], INotificationAction[]> = {};
	for (const action of data.actions) {
		if (!actionMap[action.notification_id]) {
			actionMap[action.notification_id] = [];
		}
		actionMap[action.notification_id].push(notificationActionSchema.parse(action));
	}

	const notifs: INotificationWithActions[] = [];
	for (const notification of data.notifications) {
		notifs.push({
			...notificationSchema.parse(notification),
			actions: actionMap[notification.notification_id] ?? []
		});
	}

	notifications.set(notifs);

	return {
		notifications
	};
};
