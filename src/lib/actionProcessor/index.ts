import { ActionType, type INotificationAction } from '$lib/database/models/NotificationAction';
import type { INotificationWithActions } from '$lib/app/models/NotificationWithActions';
import handleOpenUrl from './openUrl';

export default function process(
	action: INotificationAction,
	notification: INotificationWithActions
) {
	switch (action.action_type_id) {
		case ActionType.OPEN_URL:
			return handleOpenUrl(action, notification);
	}
}
