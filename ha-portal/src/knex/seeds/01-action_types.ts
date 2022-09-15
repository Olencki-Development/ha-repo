// @ts-nocheck
import { ACTION_TYPE_TABLE, NOTIFICATION_ACTION_TABLE, SCHEMA } from '../knexfile.ts';

export async function seed(knex) {
	// Deletes ALL existing entries
	await knex.withSchema(SCHEMA).table(NOTIFICATION_ACTION_TABLE).del();
	await knex.withSchema(SCHEMA).table(ACTION_TYPE_TABLE).del();

	// Inserts seed entries
	await knex
		.withSchema(SCHEMA)
		.table(ACTION_TYPE_TABLE)
		.insert([
			{
				action_type_id: 'open_url'
			}
		]);
}
