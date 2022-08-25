import { ActionType, type INotificationAction } from '$lib/database/models/NotificationAction';
import type { Notifications } from '$stores/notifications';
import handleOpenUrl from './openUrl';

export default function process(action: INotificationAction, notification: Notifications[number]) {
	switch (action.action_type_id) {
		case ActionType.OPEN_URL:
			return handleOpenUrl(action, notification);
	}
}
