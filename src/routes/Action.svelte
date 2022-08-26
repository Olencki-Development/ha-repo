<script lang="ts">
	import { ActionType, type NotificationAction } from '$lib/database/models/NotificationAction';
	import type { NotificationWithActions } from '$lib/app/models/NotificationWithActions';

	export let notification: NotificationWithActions;
	export let action: NotificationAction;

	/**
	 * Event handlers
	 */
	function handleClick() {
		// TODO: handle future actions
	}
</script>

{#if action.action_type_id === ActionType.OPEN_URL}
	<div class="p-6 text-sky-500 hover:text-sky-600 text-center">
		<a href={action.properties.url} target="_blank">
			{action.title}
		</a>
	</div>
{:else}
	<button class="p-6 text-sky-500 hover:text-sky-600" on:click={() => handleClick()}>
		{action.title}
	</button>
{/if}
