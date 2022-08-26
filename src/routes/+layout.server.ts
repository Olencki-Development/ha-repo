import {
	notificationWithActionsSchema,
	type INotificationWithActions
} from '$lib/app/models/NotificationWithActions';
import knex, { NOTIFICATION_TABLE, NOTIFICATION_ACTION_TABLE } from '$lib/database';
import type { INotification } from '$lib/database/models/Notification';
import type { INotificationAction } from '$lib/database/models/NotificationAction';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function () {
	const notifications = await knex
		.table<INotification>(NOTIFICATION_TABLE)
		.orderBy('created_at', 'desc');

	const actions = await knex.table<INotificationAction>(NOTIFICATION_ACTION_TABLE).whereIn(
		'notification_id',
		notifications.map((n) => n.notification_id)
	);

	const actionMap: Record<
		INotificationAction['notification_id'],
		INotificationWithActions['actions']
	> = {};
	for (const action of actions) {
		if (!actionMap[action.notification_id]) {
			actionMap[action.notification_id] = [];
		}
		actionMap[action.notification_id].push(
			notificationWithActionsSchema.shape.actions.element.parse(action)
		);
	}

	const response: INotificationWithActions[] = [];
	for (const notification of notifications) {
		response.push(
			notificationWithActionsSchema.parse({
				...notification,
				actions: actionMap[notification.notification_id] ?? []
			})
		);
	}

	// Dates are not json serializable this helps mitigate the issue
	return {
		notifications: JSON.parse(JSON.stringify(response)) as INotificationWithActions[]
	};
};
