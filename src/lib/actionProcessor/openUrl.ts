import { ActionType, type INotificationAction } from '$lib/database/models/NotificationAction';
import type { Notifications } from '$stores/notifications';

export default function handleOpenUrl(
	action: INotificationAction,
	notification: Notifications[number]
) {
	if (action.action_type_id === ActionType.OPEN_URL) {
		return window.open(action.properties.url, '_blank');
	}
}
