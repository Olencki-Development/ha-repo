import { getErrorMessage } from '$lib/app/error';
import { NotificationWithActions } from '$lib/app/models/NotificationWithActions';
import { NOTIFICATION_ACTION_TABLE, NOTIFICATION_TABLE } from '$lib/database';
import type { Notification } from '$lib/database/models/Notification';
import { error } from '@sveltejs/kit';
import knex from '$lib/database';
import { ZodError } from 'zod';
import type { RequestHandler } from './$types';
import type { z } from 'zod';

const UpdateNotificationPayload = NotificationWithActions.pick({
	read_at: true
});
type UpdateNotificationPayload = z.infer<typeof UpdateNotificationPayload>;

export const PATCH: RequestHandler = async function ({ request, params }) {
	const json = await request.json();

	let payload: UpdateNotificationPayload;
	try {
		payload = UpdateNotificationPayload.parse(json);
	} catch (e) {
		console.error(e);
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

	const notificationResults = await knex
		.table<Notification>(NOTIFICATION_TABLE)
		.update({
			read_at: payload.read_at
		})
		.where('notification_id', '=', params.notification_id)
		.returning('*');

	const actionResults = await knex
		.table<NotificationWithActions>(NOTIFICATION_ACTION_TABLE)
		.where('notification_id', '=', params.notification_id);

	const response = NotificationWithActions.parse({
		...notificationResults[0],
		actions: actionResults
	});

	return new Response(JSON.stringify(response));
};
