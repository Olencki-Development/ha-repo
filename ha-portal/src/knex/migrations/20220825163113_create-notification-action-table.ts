// @ts-nocheck
import {
	NOTIFICATION_TABLE,
	NOTIFICATION_ACTION_TABLE,
	ACTION_TYPE_TABLE,
	SCHEMA
} from '../knexfile.ts';

export async function up(knex) {
	await knex.withSchema(SCHEMA).raw(`
    CREATE TABLE ${SCHEMA}.${ACTION_TYPE_TABLE} (
      action_type_id varchar primary key
    );
  `);
	await knex.withSchema(SCHEMA).raw(`
    CREATE TABLE ${SCHEMA}.${NOTIFICATION_ACTION_TABLE} (
      notification_action_id serial primary key,
      notification_id int not null,
      title varchar not null,
      action_type_id varchar not null,
      properties jsonb not null default '{}'::jsonb,
      created_at timestamp(6) with time zone not null default now(),
      updated_at timestamp(6) with time zone not null default now(),

      CONSTRAINT notification_action_notification_fk FOREIGN KEY (notification_id) REFERENCES ${SCHEMA}.${NOTIFICATION_TABLE}(notification_id),
      CONSTRAINT notification_action_action_type_fk FOREIGN KEY (action_type_id) REFERENCES ${SCHEMA}.${ACTION_TYPE_TABLE}(action_type_id)
    );
  `);
}

export async function down(knex) {
	await knex.withSchema(SCHEMA).raw(`
    DROP TABLE ${SCHEMA}.${NOTIFICATION_ACTION_TABLE};
    DROP TABLE ${SCHEMA}.${ACTION_TYPE_TABLE};
  `);
}
