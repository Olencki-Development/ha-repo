import { getPageTitle } from '$navigate';
import { writable } from 'svelte/store';

function getPageTitleStore() {
	const store = writable(getPageTitle());

	return {
		...store,
		set: (subPage?: string) => store.set(getPageTitle(subPage))
	};
}

export const pageTitle = getPageTitleStore();
