import { NotificationWithActions } from '$lib/app/models/NotificationWithActions';
import knex, { NOTIFICATION_ACTION_TABLE, NOTIFICATION_TABLE, SCHEMA } from '$lib/database';
import type { RequestHandler } from './$types';
import { ZodError } from 'zod';
import { error } from '@sveltejs/kit';
import { getErrorMessage } from '$lib/app/error';
import type { Notification } from '$lib/database/models/Notification';
import type { NotificationAction } from '$lib/database/models/NotificationAction';

export const GET: RequestHandler = async function () {
	const notifications = await knex
		.withSchema(SCHEMA)
		.table<Notification>(NOTIFICATION_TABLE)
		.orderBy('created_at', 'desc');

	const actions = await knex
		.withSchema(SCHEMA)
		.table<NotificationAction>(NOTIFICATION_ACTION_TABLE)
		.whereIn(
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
	return new Response(JSON.stringify(response));
};

export const POST: RequestHandler = async function ({ request }) {
	const json = await request.json();

	let notificationWithActions: NotificationWithActions;
	try {
		notificationWithActions = NotificationWithActions.parse(json);
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

	const transaction = await knex.transaction();
	try {
		const notificationResults = await knex
			.withSchema(SCHEMA)
			.table<Notification>(NOTIFICATION_TABLE)
			.transacting(transaction)
			.insert({
				title: notificationWithActions.title,
				body: notificationWithActions.body ?? undefined,
				data: notificationWithActions.data
			})
			.returning('*');

		let actionResults: NotificationAction[] = [];
		if (notificationWithActions.actions.length) {
			actionResults = await knex
				.withSchema(SCHEMA)
				.table<NotificationAction>(NOTIFICATION_ACTION_TABLE)
				.transacting(transaction)
				.insert(
					notificationWithActions.actions.map((action) => {
						return {
							...action,
							notification_id: notificationResults[0].notification_id
						};
					})
				)
				.returning('*');
		}

		await transaction.commit();

		const response = NotificationWithActions.parse({
			...notificationResults[0],
			actions: actionResults
		});

		return new Response(JSON.stringify(response));
	} catch (e) {
		console.error(e);
		await transaction.rollback();

		throw error(500, getErrorMessage('Unexpected server error.'));
	}
};
