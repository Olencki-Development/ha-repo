import { NotificationWithActions } from '$lib/app/models/NotificationWithActions';
import knex, { NOTIFICATION_TABLE, NOTIFICATION_ACTION_TABLE } from '$lib/database';
import type { Notification } from '$lib/database/models/Notification';
import type { NotificationAction } from '$lib/database/models/NotificationAction';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function () {
	const notifications = await knex
		.table<Notification>(NOTIFICATION_TABLE)
		.orderBy('created_at', 'desc');

	const actions = await knex.table<NotificationAction>(NOTIFICATION_ACTION_TABLE).whereIn(
		'notification_id',
		notifications.map((n) => n.notification_id)
	);

	const actionMap: Record<
		NotificationAction['notification_id'],
		NotificationWithActions['actions']
	> = {};
	for (const action of actions) {
		if (!actionMap[action.notification_id]) {
			actionMap[action.notification_id] = [];
		}
		actionMap[action.notification_id].push(
			NotificationWithActions.shape.actions.element.parse(action)
		);
	}

	const response: NotificationWithActions[] = [];
	for (const notification of notifications) {
		response.push(
			NotificationWithActions.parse({
				...notification,
				actions: actionMap[notification.notification_id] ?? []
			})
		);
	}

	// Dates are not json serializable this helps mitigate the issue
	return {
		notifications: JSON.parse(JSON.stringify(response)) as NotificationWithActions[]
	};
};
