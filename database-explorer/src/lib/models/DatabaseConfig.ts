import { z } from 'zod';

export enum DatabaseType {
	PG = 'pg'
}

export const DatabaseConfig = z.object({
	id: z.string().optional(),
	type: z.nativeEnum(DatabaseType).default(DatabaseType.PG),
	name: z.string().min(1),
	host: z.string().min(1),
	port: z.number().positive().default(5432),
	username: z.string().min(1).nullable(),
	password: z.string().min(1).nullable()
});
export type DatabaseConfig = z.infer<typeof DatabaseConfig>;
