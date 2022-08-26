// @ts-nocheck
import { ACTION_TYPE_TABLE, NOTIFICATION_ACTION_TABLE } from '../knexfile.ts';

export async function seed(knex) {
	// Deletes ALL existing entries
	await knex(NOTIFICATION_ACTION_TABLE).del();
	await knex(ACTION_TYPE_TABLE).del();

	// Inserts seed entries
	await knex(ACTION_TYPE_TABLE).insert([
		{
			action_type_id: 'open_url'
		}
	]);
}
