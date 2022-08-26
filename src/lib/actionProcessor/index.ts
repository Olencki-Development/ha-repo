import { ActionType, type INotificationAction } from '$lib/database/models/NotificationAction';
import type { NotificationWithActions } from '$lib/app/models/NotificationWithActions';
import handleOpenUrl from './openUrl';

export default function process(
	action: INotificationAction,
	notification: NotificationWithActions
) {
	switch (action.action_type_id) {
		case ActionType.OPEN_URL:
			return handleOpenUrl(action, notification);
	}
}
