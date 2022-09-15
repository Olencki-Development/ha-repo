import { NotificationWithActions } from '$lib/app/models/NotificationWithActions';
import { writable } from 'svelte/store';

function getNotificationStore() {
	const store = writable<NotificationWithActions[]>([]);

	return {
		...store,
		markAsRead: async function (notification: NotificationWithActions) {
			const result = await fetch(`/notifications/${notification.notification_id}`, {
				method: 'PATCH',
				body: JSON.stringify({
					read_at: new Date()
				})
			});
			const json = await result.json();
			const updatedNotification = NotificationWithActions.parse(json);

			store.update((v) =>
				v.map((n) => {
					if (n.notification_id === notification.notification_id) {
						return updatedNotification;
					}
					return n;
				})
			);
		}
	};
}
export const notifications = getNotificationStore();
