// @ts-nocheck
import { NOTIFICATION_TABLE, NOTIFICATION_ACTION_TABLE } from '../knexfile.ts';

export async function seed(knex) {
	// Deletes ALL existing entries
	await knex(NOTIFICATION_ACTION_TABLE).del();
	await knex(NOTIFICATION_TABLE).del();

	// Inserts seed entries
	const notifications = await knex(NOTIFICATION_TABLE)
		.insert([
			{
				title: 'App initialized!',
				body: `Home Assistant portal is a way to receive interactive notification in a persistent way.
			
The goals are to:
* Receive notifications and display them in an intuitive UI
* Interact with notifications allowing powerful connectivity
* Provide a log history of the notifications that have been received and what actions are selected`
			}
		])
		.returning('*');
	await knex(NOTIFICATION_ACTION_TABLE).insert([
		{
			notification_id: notifications[0].notification_id,
			title: "What's Home Assistant?",
			action_type_id: 'open_url',
			properties: {
				url: 'https://www.home-assistant.io/'
			}
		}
	]);
}
