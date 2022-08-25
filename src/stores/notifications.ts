import type { INotification } from '$lib/database/models/Notification';
import type { INotificationAction } from '$lib/database/models/NotificationAction';
import { writable } from 'svelte/store';

export type Notifications = (INotification & { actions: INotificationAction[] })[];

function getNotificationStore() {
	const store = writable<Notifications>([]);

	return store;
}
export const notifications = getNotificationStore();
