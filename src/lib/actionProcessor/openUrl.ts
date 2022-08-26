import { ActionType, type INotificationAction } from '$lib/database/models/NotificationAction';
import type { INotificationWithActions } from '$lib/app/models/NotificationWithActions';

export default function handleOpenUrl(
	action: INotificationAction,
	notification: INotificationWithActions
) {
	if (action.action_type_id === ActionType.OPEN_URL) {
		return window.open(action.properties.url, '_blank');
	}
}
