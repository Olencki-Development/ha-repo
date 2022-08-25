import type { LayoutLoad } from './$types';
import { Notification } from '$lib/database/models/Notification';
import { notifications } from '$stores/notifications';

export const load: LayoutLoad = function ({ data, url }) {
	const notificationModels = data.notifications.map(
		(notification) => new Notification(notification)
	);
	notifications.set(notificationModels);

	return {
		notifications
	};
};
