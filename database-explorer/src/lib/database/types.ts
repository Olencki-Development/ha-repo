import type { z } from 'zod';
import { DB_WINDOW_KEY } from './consts';

declare global {
	interface Window {
		[DB_WINDOW_KEY]: {
			[db: string]: Database;
		};
	}
}

export interface Database {
	foo: string;
}

export type TableSchema = z.SomeZodObject;

export type TableConfig<T extends TableSchema = TableSchema> = {
	schema: T;
	name: string;
	primaryKey?: keyof z.infer<T>;
};

export type Table<T extends TableSchema = TableSchema> = Required<TableConfig<T>>;

export type TableRows<T> = Map<number, T>;
