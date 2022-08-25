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
