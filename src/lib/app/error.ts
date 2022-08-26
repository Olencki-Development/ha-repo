type ErrorContent = {
	message: string;
	context?: Record<string, any>;
};

export function getErrorMessage(content: ErrorContent): string;
export function getErrorMessage(content: string): string;
export function getErrorMessage(messageOrContent: ErrorContent | string): string {
	if (typeof messageOrContent === 'string') {
		const internalContent = {
			message: messageOrContent
		};
		return JSON.stringify(internalContent);
	}
	return JSON.stringify(messageOrContent);
}
