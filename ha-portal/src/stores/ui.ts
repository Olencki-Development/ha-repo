import { getPageTitle } from '$navigate';
import { writable } from 'svelte/store';

export const darkMode = writable(false);

function getPageTitleStore() {
	const store = writable(getPageTitle());

	return {
		...store,
		set: (subPage?: string) => store.set(getPageTitle(subPage))
	};
}

export const pageTitle = getPageTitleStore();

type BackAction = {
	title: string;
	to: string;
};

export const backAction = writable<BackAction | null>(null);

export enum NotificationFilter {
	ALL = 'All',
	READ = 'Read',
	UNREAD = 'Unread'
}

export const notificationFilter = writable<NotificationFilter>(NotificationFilter.UNREAD);

function getErrorsStore() {
  const store = writable<Error[]>([]);
  
  return {
	...store,
    add: (error: Error) => {
      console.error(error);
      store.update((v) => [error, ...v])
    },
    set: (errors: Error[]) => {
      errors.map(console.error)
      store.set(errors)
    },
    clear: () => store.set([])
  };
}
export const errors = getErrorsStore();