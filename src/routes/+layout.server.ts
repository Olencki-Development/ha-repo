import type { LayoutServerLoad } from './$types';
import { BASIC_AUTH } from '$env/static/private';

export const load: LayoutServerLoad = async function (e) {
	const result = await fetch(`${e.url.origin}/notifications`, {
		headers: {
			Authorization: `Basic ${Buffer.from(BASIC_AUTH).toString('base64')}`
		}
	});

	return {
		notifications: result.json()
	};
};
