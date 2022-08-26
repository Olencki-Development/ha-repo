import { ActionType, type INotificationAction } from '$lib/database/models/NotificationAction';
import type { NotificationWithActions } from '$lib/app/models/NotificationWithActions';

export default function handleOpenUrl(
	action: INotificationAction,
	notification: NotificationWithActions
) {
	if (action.action_type_id === ActionType.OPEN_URL) {
		return window.open(action.properties.url, '_blank');
	}
}
