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

	return {
		notifications: JSON.parse(JSON.stringify(notifications)),
		actions: JSON.parse(JSON.stringify(actions))
	};
};
