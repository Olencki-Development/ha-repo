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
		subscribe: store.subscribe,
		clear: () => store.set([]),
		safeExec: async <F extends (...args: any) => any>(
			func: F,
			...args: Parameters<F>
		): Promise<Awaited<ReturnType<F>> | undefined> => {
			try {
				return await func(...(args as any[]));
			} catch (e) {
				if (e instanceof Error) {
					store.update((v) => [e, ...v]);
				}
				return undefined;
			}
		}
	};
}
export const errors = getErrorsStore();
