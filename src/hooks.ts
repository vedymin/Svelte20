import type { Handle } from '@sveltejs/kit/types';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname != '/sheet')
		return new Response('', {
			status: 301,
			headers: {
				Location: '/sheet'
			}
		});

	const response = await resolve(event);
	return response;
};
