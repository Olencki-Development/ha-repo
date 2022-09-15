<script lang="ts">
	import { ActionType } from '$lib/database/models/NotificationAction';
	import type { NotificationWithActions } from '$lib/app/models/NotificationWithActions';

	export let action: NotificationWithActions['actions'][number];

	/**
	 * Event handlers
	 */
	function handleClick() {
		// TODO: handle future actions
	}
</script>

{#if action.action_type_id === ActionType.OPEN_URL}
	<div class="p-6 text-sky-500 hover:text-sky-600 text-center action">
		<a href={action.properties.url} target="_blank">
			{action.title}
		</a>
	</div>
{:else}
	<button class="p-6 text-sky-500 hover:text-sky-600 action" on:click={() => handleClick()}>
		{action.title}
	</button>
{/if}

<style lang="scss">
	.action {
		&:not(:last-of-type) {
			@apply border-r-2 border-r-neutral-400/25;
		}
	}
</style>
