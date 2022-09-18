export function getPageTitle(subPage?: string) {
	const baseTitle = 'HA Portal';

	if (subPage) {
		return `${baseTitle} | ${subPage}`;
	}

	return baseTitle;
}
