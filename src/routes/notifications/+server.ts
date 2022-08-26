import { NotificationWithActions } from '$lib/app/models/NotificationWithActions';
import knex, { NOTIFICATION_ACTION_TABLE, NOTIFICATION_TABLE } from '$lib/database';
import { Notification } from '$lib/database/models/Notification';
import { NotificationAction } from '$lib/database/models/NotificationAction';
import type { RequestHandler } from './$types';
import { z, ZodError } from 'zod';
import { error, json } from '@sveltejs/kit';
import { getErrorMessage } from '$lib/app/error';

export const POST: RequestHandler = async function ({ request }) {
	const json = await request.json();

	let notificationWithActions;
	try {
		notificationWithActions = NotificationWithActions.parse(json);
	} catch (e) {
		if (e instanceof ZodError) {
			throw error(
				400,
				getErrorMessage({
					message: 'Invalid request.',
					context: e.flatten().fieldErrors
				})
			);
		}
		throw error(500, getErrorMessage('Unexpected server error.'));
	}

	const transaction = await knex.transaction();
	try {
		const notificationResults = await knex
			.table<Notification>(NOTIFICATION_TABLE)
			.transacting(transaction)
			.insert(Notification.parse(notificationWithActions))
			.returning('*');

		let actionResults: NotificationAction[] = [];
		if (notificationWithActions.actions.length) {
			actionResults = await knex
				.table<NotificationAction>(NOTIFICATION_ACTION_TABLE)
				.transacting(transaction)
				.insert(
					z.array(NotificationAction).parse(
						notificationWithActions.actions.map((action) => {
							return {
								...action,
								notification_id: notificationResults[0].notification_id
							};
						})
					)
				)
				.returning('*');
		}

		await transaction.commit();

		const response = NotificationWithActions.parse({
			...notificationResults[0],
			actions: actionResults
		});

		return json(response);
	} catch (e) {
		await transaction.rollback();

		throw error(500, getErrorMessage('Unexpected server error.'));
	}
};
