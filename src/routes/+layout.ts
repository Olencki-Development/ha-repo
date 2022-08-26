import type { LayoutLoad } from './$types';
import { notifications } from '$stores/notifications';
import { notificationWithActionsSchema } from '$lib/app/models/NotificationWithActions';
import { z } from 'zod';

export const load: LayoutLoad = function ({ data }) {
	notifications.set(z.array(notificationWithActionsSchema).parse(data.notifications));

	return {
		notifications
	};
};
