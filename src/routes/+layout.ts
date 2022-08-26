import type { LayoutLoad } from './$types';
import { notifications } from '$stores/notifications';
import { NotificationWithActions } from '$lib/app/models/NotificationWithActions';
import { z } from 'zod';

export const load: LayoutLoad = async function ({ fetch }) {
	const result = await fetch('/notifications');
	const json = await result.json();

	notifications.set(z.array(NotificationWithActions).parse(json));

	return {
		notifications
	};
};
