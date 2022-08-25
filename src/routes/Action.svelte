<script lang="ts">
	import type { INotificationAction } from '$lib/database/models/NotificationAction';
	import type { Notifications } from '$stores/notifications';
	import process from '$lib/actionProcessor';

	export let notification: Notifications[number];
	export let action: INotificationAction;

	/**
	 * Event handlers
	 */
	function handleClick() {
		return process(action, notification);
	}
</script>

<button class="p-6 text-sky-500 hover:text-sky-600" on:click={() => handleClick()}>
	{action.title}
</button>
