import type { Handle, RequestEvent } from '@sveltejs/kit';
import { BASIC_AUTH, WHITELISTED_DOMAINS } from '$env/static/private';
import { getErrorMessage } from '$lib/app/error';

const whitelist = JSON.parse(WHITELISTED_DOMAINS ?? '[]');

function isSafeRequestOrigin(event: RequestEvent<Partial<Record<string, string>>>): boolean {
	const isSameOrigin = event.getClientAddress() === event.url.hostname;
	if (isSameOrigin) {
		return true;
	}
	if (whitelist.includes(event.url.hostname)) {
		return true;
	}

	return false;
}

export const handle: Handle = async ({ event, resolve }) => {
	const url = new URL(event.request.url);

	if (isSafeRequestOrigin(event)) {
		return resolve(event);
	}

	if (url.pathname.startsWith('/notifications')) {
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
