// @ts-nocheck
import { NOTIFICATION_TABLE } from '../knexfile.ts';

export async function up(knex) {
	await knex.raw(`
    CREATE TABLE ${NOTIFICATION_TABLE} (
      notification_id serial primary key,
      title varchar not null,
      body varchar null,
      read_at timestamp(6) with time zone null,
      created_at timestamp(6) with time zone null default now(),
      updated_at timestamp(6) with time zone null default now()
    );
  `);
}

export async function down(knex) {
	await knex.raw(`
    DROP TABLE ${NOTIFICATION_TABLE};
  `);
}
