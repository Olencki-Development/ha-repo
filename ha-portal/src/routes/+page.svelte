<script lang="ts">
	import type { NotificationWithActions } from '$lib/app/models/NotificationWithActions';
	import type { PageData } from '.svelte-kit/types/src/routes/$types';
	import { TrashCanSolid } from 'svelte-awesome-icons';
	import Action from './Action.svelte';
	import { NotificationFilter, notificationFilter } from '$stores/ui';

	export let data: PageData;
	const { notifications } = data;

	/**
	 * Reactive vars
	 */
	$: filteredNotifications = $notifications.filter((n) => {
		if ($notificationFilter === NotificationFilter.READ) {
			return !!n.read_at;
		}
		if ($notificationFilter === NotificationFilter.UNREAD) {
			return !n.read_at;
		}
		return true;
	});

	/**
	 * Event handlers
	 */
	async function handleMarkAsRead(notification: NotificationWithActions) {
		return data.notifications.markAsRead(notification);
	}
</script>

<div class="w-full flex justify-center">
	<div class="flex flex-col w-1/3 gap-6">
		{#each filteredNotifications as notification (notification.notification_id)}
			<div
				class={`tile ${
					notification.read_at ? 'bg-slate-200 dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-700'
				} rounded-md`}
			>
				<div class="p-6 flex justify-between">
					<div>
						<p class="text-2xl">{notification.title}</p>
						<p class="text-neutral-400 whitespace-pre-line text-xs">
							{notification.created_at?.toDateString()} @ {notification.created_at?.toLocaleTimeString(
								'en-US'
							)}
						</p>
					</div>
					{#if notification.read_at === null}
						<div class="flex justify-center items-center">
							<button
								on:click={() => handleMarkAsRead(notification)}
								type="submit"
								class="px-2 py-1.5 font-semibold text-sm bg-red-500/50 hover:bg-red-600/50 text-white rounded-md shadow-sm opacity-100 flex items-center"
							>
								<TrashCanSolid size="16" />
							</button>
						</div>
					{/if}
				</div>
				{#if notification.body}
					<div class="p-6">
						<p class="text-neutral-600 dark:text-neutral-300 whitespace-pre-line">
							{notification.body}
						</p>
					</div>
				{/if}
				{#if notification.actions.length}
					<div class="grid grid-flow-col rounded-b-md overflow-hidden">
						{#each notification.actions as action (action.notification_action_id)}
							<Action {action} />
						{/each}
					</div>
				{/if}
			</div>
		{:else}
			<p class="text-center">You're all caught up.</p>
		{/each}
	</div>
</div>

<style lang="scss">
	.tile {
		> :not(:last-child) {
			@apply border-b-2 border-b-neutral-400/25;
		}
	}
</style>
