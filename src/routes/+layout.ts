import type { LayoutLoad } from './$types';
import { Notification } from '$lib/database/models/Notification';
import { writable } from 'svelte/store';

export const load: LayoutLoad = function ({ data, url }) {
	const notificationModels = data.notifications.map(
		(notification) => new Notification(notification)
	);
	const notifications = writable(notificationModels);

	return {
		notifications
	};
};
