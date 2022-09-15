import type { Handle } from '@sveltejs/kit';
import { BASIC_AUTH } from '$env/static/private';
import { getErrorMessage } from '$lib/app/error';

export const handle: Handle = async ({ event, resolve }) => {
	const url = new URL(event.request.url);
	const isSameOrigin = event.getClientAddress() === event.url.hostname;

	if (url.pathname.startsWith('/notifications') && !isSameOrigin) {
		const auth = event.request.headers.get('Authorization');

		if (auth !== `Basic ${Buffer.from(BASIC_AUTH).toString('base64')}`) {
			return new Response(getErrorMessage('Not authorized'), {
				status: 401,
				headers: {
					'WWW-Authenticate': 'Basic realm="User Visible Realm", charset="UTF-8"'
				}
			});
		}
	}

	return resolve(event);
};
