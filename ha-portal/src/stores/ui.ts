import { getPageTitle } from '$navigate';
import { writable } from 'svelte/store';
import { localStore } from '$lib/utils/localStore';

function getPageTitleStore() {
	const store = writable(getPageTitle());

	return {
		...store,
		set: (subPage?: string) => store.set(getPageTitle(subPage))
	};
}

export const pageTitle = getPageTitleStore();

export enum NotificationFilter {
	ALL = 'All',
	READ = 'Read',
	UNREAD = 'Unread'
}

export const notificationFilter = localStore<NotificationFilter>(
	'notification_filter',
	NotificationFilter.UNREAD
);

export enum ColorTheme {
	SYSTEM = 'System',
	DARK = 'Dark',
	LIGHT = 'Light'
}
export const theme = localStore<{ color: ColorTheme }>('color_theme', { color: ColorTheme.SYSTEM });

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
