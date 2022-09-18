import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	if (!event.url.pathname.endsWith('/favicon.png') && !response.ok) {
		const body = await response.text();
		console.log(event.request.url, body);
	}

	return response;
};
