import type { LayoutLoad } from './$types';
import { initDb } from '$lib/database';
import { createTable } from '$lib/database/table';
import { DatabaseConfig } from '$lib/models/DatabaseConfig';

export const load: LayoutLoad = async () => {
	initDb('database-explorer');

	return {
		databaseConfigTable: createTable({
			schema: DatabaseConfig,
			name: 'database_config'
		})
	};
};
