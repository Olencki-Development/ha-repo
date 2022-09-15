import type { LayoutLoad } from './$types';
import { notifications } from '$stores/notifications';
import { NotificationWithActions } from '$lib/app/models/NotificationWithActions';
import { z } from 'zod';
import { errors } from '$stores/ui';

export const load: LayoutLoad = async function ({ data, fetch }) {
  try {
    const response = await fetch('/notifications');
    const json = await response.json();

    notifications.set(z.array(NotificationWithActions).parse(json));
  } catch (e) {
    errors.add(e);
  }
  
  return {
    notifications
  };
};
