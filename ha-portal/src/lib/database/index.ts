import knexFunc from 'knex';
import fetchConfig, {
	SCHEMA,
	NOTIFICATION_TABLE,
	NOTIFICATION_ACTION_TABLE
} from '../../knex/knexfile';
import pg from 'pg';

export { SCHEMA, NOTIFICATION_TABLE, NOTIFICATION_ACTION_TABLE };

pg.types.setTypeParser(pg.types.builtins.INT2, parseInt);
pg.types.setTypeParser(pg.types.builtins.INT4, parseInt);
pg.types.setTypeParser(pg.types.builtins.INT8, parseInt);
pg.types.setTypeParser(pg.types.builtins.FLOAT4, parseFloat);
pg.types.setTypeParser(pg.types.builtins.FLOAT8, parseFloat);
pg.types.setTypeParser(pg.types.builtins.NUMERIC, parseFloat);

const knex = knexFunc(await fetchConfig());

export default knex;
