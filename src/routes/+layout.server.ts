import knex, { NOTIFICATION_TABLE } from '$lib/database';
import type { INotification } from '$lib/database/models/Notification';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function () {
	const notifications = await knex
		.table<INotification>(NOTIFICATION_TABLE)
		.orderBy('created_at', 'desc');

	return {
		notifications: JSON.parse(JSON.stringify(notifications))
	};
};
