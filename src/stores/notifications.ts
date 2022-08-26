import type { INotificationWithActions } from '$lib/app/models/NotificationWithActions';
import { writable } from 'svelte/store';

function getNotificationStore() {
	const store = writable<INotificationWithActions[]>([]);

	return store;
}
export const notifications = getNotificationStore();
