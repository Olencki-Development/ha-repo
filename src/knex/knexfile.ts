// @ts-nocheck
import path from 'path';

export const NOTIFICATION_TABLE = 'notifications';
export const NOTIFICATION_ACTION_TABLE = 'notification_action';
export const ACTION_TYPE_TABLE = 'action_type';

export async function fetchConnection() {
	let env;
	try {
		env = await import('$env/static/private');
	} catch {
		const { config } = await import('dotenv');
		env = config({
			path: path.resolve(__dirname, '../../.env')
		}).parsed;
	}

	return {
		host: env.DB_HOST,
		user: env.DB_USERNAME,
		password: env.DB_PASSWORD,
		database: env.DB_DATABASE
	};
}

export default async function fetchConfig() {
	return {
		client: 'pg',
		connection: await fetchConnection(),
		migrations: {
			extension: 'ts',
			directory: 'migrations',
			tableName: 'migrations_history'
		},
		seeds: {
			extension: 'ts',
			directory: 'seeds'
		}
	};
}
