// @ts-nocheck
import { NOTIFICATION_TABLE } from '../knexfile.ts';

export async function seed(knex) {
	// Deletes ALL existing entries
	await knex(NOTIFICATION_TABLE).del();

	// Inserts seed entries
	await knex(NOTIFICATION_TABLE).insert([
		{
			title: 'App initialized!',
			body: `
            Home Assistant portal is a way to receive interactive notification in a persistent way.
            The goals are to:
            * Receive notifications and display them in an intuitive UI
            * Interact with notifications allowing powerful connectivity
            * Provide a log history of the notifications that have been received and what actions are selected
            `
		}
	]);
}
