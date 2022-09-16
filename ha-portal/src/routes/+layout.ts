import type { LayoutLoad } from './$types';
import { notifications } from '$stores/notifications';
import { NotificationWithActions } from '$lib/app/models/NotificationWithActions';
import { z } from 'zod';
import { errors } from '$stores/ui';

export const load: LayoutLoad = async function ({ data, fetch }) {
	const payload = await errors.safeExec(async () => {
		const response = await fetch('/notifications');
		const json = await response.json();

		const parsedResponse = z.array(NotificationWithActions).parse(json);
		return parsedResponse;
	});

	if (payload !== undefined) {
		notifications.set(payload);
	}

	return {
		notifications
	};
};
