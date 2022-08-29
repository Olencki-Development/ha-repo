import type { LayoutLoad } from './$types';
import { notifications } from '$stores/notifications';
import { NotificationWithActions } from '$lib/app/models/NotificationWithActions';
import { z } from 'zod';

export const load: LayoutLoad = async function ({ data }) {
	notifications.set(z.array(NotificationWithActions).parse(data.notifications));

	return {
		notifications
	};
};
