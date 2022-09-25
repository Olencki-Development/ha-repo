import type { z } from 'zod';
import type { TableSchema, TableConfig, Table, TableRows } from '../types';
import { TableQueryBuilder } from './QueryBuilder';

/**
 * Table model to interact with the table a large
 */
class TableModel<T extends TableSchema> {
	protected _rows: TableRows<z.infer<T>> = new Map();

	constructor(readonly table: Table<T>) {}

	/**
	 * Insert a new row
	 */
	insert(fields: z.infer<T>): z.infer<T> {
		const newRow = this.table.schema.parse({
			[this.table.primaryKey]: this._getNextPrimaryKey(),
			...fields
		});

		this._rows.set(newRow[this.table.primaryKey], newRow);

		return newRow;
	}

	/**
	 * Initialize a new query around the data
	 */
	query(): TableQueryBuilder<T> {
		return new TableQueryBuilder(this._rows, this.table);
	}

	protected _getNextPrimaryKey(): number {
		const keys = this._rows.keys();
		const max = Math.max.apply(null, Array.from(keys));
		if (!isFinite(max)) {
			return 1;
		}
		return max + 1;
	}
}

export function createTable<T extends TableSchema>(tableConfig: TableConfig<T>): TableModel<T> {
	const table: Table<T> = {
		primaryKey: 'id',
		...tableConfig
	};
	return new TableModel(table);
}
