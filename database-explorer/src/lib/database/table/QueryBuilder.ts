import type { z } from 'zod';
import type { Table, TableRows, TableSchema } from '../types';
import { PromiseBuilder } from '../utils/PromiseBuilder';

/**
 * Query class responsible for querying data within the table
 */
export class TableQueryBuilder<T extends TableSchema> extends PromiseBuilder<z.infer<T>> {
	protected _rows: TableRows<z.infer<T>>;
	protected _table: Table<T>;

	constructor(rows: TableRows<z.infer<T>>, table: Table<T>) {
		super();

		this._rows = rows;
		this._table = table;
	}

	protected async _fetchResult(): Promise<z.infer<T>> {
		const rows = Array.from(this._rows.values());
		return rows;
	}
}
