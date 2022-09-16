/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { NOTIFICATION_TABLE, SCHEMA } from '../knexfile.ts';

export async function up(knex) {
	await knex.withSchema(SCHEMA).raw(`
    CREATE TABLE ${SCHEMA}.${NOTIFICATION_TABLE} (
      notification_id serial primary key,
      title varchar not null,
      body varchar null,
      data jsonb not null default '{}'::jsonb,
      read_at timestamp(6) with time zone null,
      created_at timestamp(6) with time zone not null default now(),
      updated_at timestamp(6) with time zone not null default now()
    );
  `);
}

export async function down(knex) {
	await knex.withSchema(SCHEMA).raw(`
    DROP TABLE ${SCHEMA}.${NOTIFICATION_TABLE};
  `);
}
