import { notificationWithActionsSchema } from '$lib/app/models/NotificationWithActions';
import knex, { NOTIFICATION_ACTION_TABLE, NOTIFICATION_TABLE } from '$lib/database';
import { type INotification, notificationSchema } from '$lib/database/models/Notification';
import {
	type INotificationAction,
	notificationActionSchema
} from '$lib/database/models/NotificationAction';
import type { RequestHandler } from './$types';
import { z } from 'zod';

export const POST: RequestHandler = async function ({ request }) {
	const json = await request.json();
	const notificationWithActions = notificationWithActionsSchema.parse(json);

	const transaction = await knex.transaction();
	try {
		const results = await knex
			.table<INotification>(NOTIFICATION_TABLE)
			.transacting(transaction)
			.insert(notificationSchema.parse(notificationWithActions))
			.returning('notification_id');

		if (notificationWithActions.actions.length) {
			await knex
				.table<INotificationAction>(NOTIFICATION_ACTION_TABLE)
				.transacting(transaction)
				.insert(
					z.array(notificationActionSchema).parse(
						notificationWithActions.actions.map((action) => {
							return {
								...action,
								notification_id: results[0].notification_id
							};
						})
					)
				);
		}

		await transaction.commit();
	} catch (e) {
		await transaction.rollback();
	}

	return new Response(undefined, {
		status: 204
	});
};
