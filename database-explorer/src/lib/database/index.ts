import { DB_WINDOW_KEY } from './consts';
import type { Database } from './types';

export function initDb(name: string, version = 1): Database {
	const dbName = `datebase_${name}_v${version}`;
	if (!window[DB_WINDOW_KEY]) {
		window[DB_WINDOW_KEY] = {};
	}

	if (!window[DB_WINDOW_KEY][dbName]) {
		window[DB_WINDOW_KEY][dbName] = {
			foo: 'bar'
		};
	}

	return window[DB_WINDOW_KEY][dbName];
}
