export function getPageTitle(subPage?: string) {
	const baseTitle = 'Database Explorer';

	if (subPage) {
		return `${baseTitle} | ${subPage}`;
	}

	return baseTitle;
}
