import type { INotification } from '$lib/database/models/Notification';
import { writable } from 'svelte/store';

function getNotificationStore() {
	const store = writable<INotification[]>([]);

	return store;
}
export const notifications = getNotificationStore();
