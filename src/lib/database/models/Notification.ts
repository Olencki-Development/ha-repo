import { z } from 'zod';

export const notificationSchema = z.object({
	notification_id: z.number(),
	title: z.string().min(1).nullable(),
	body: z.string().min(1),
	read_at: z.date().nullable(),
	created_at: z.date(),
	updated_at: z.date()
});
export type INotification = z.infer<typeof notificationSchema>;

export class Notification implements INotification {
	readonly notification_id: INotification['notification_id'];
	readonly title: INotification['title'];
	readonly body: INotification['body'];
	readonly read_at: INotification['read_at'];
	readonly created_at: INotification['created_at'];
	readonly updated_at: INotification['updated_at'];

	constructor(data: INotification) {
		this.notification_id = data.notification_id;
		this.title = data.title;
		this.body = data.body;
		this.read_at = data.read_at;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
	}
}
