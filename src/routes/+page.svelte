<script lang="ts">
	import type { PageData } from '.svelte-kit/types/src/routes/$types';

	export let data: PageData;
	const { notifications } = data;
</script>

<div class="w-full h-screen flex justify-center">
	<div class="flex flex-col w-1/3">
		{#each $notifications as notification (notification.notification_id)}
			<div
				class={`px-6 py-4 ${
					notification.read_at ? 'bg-slate-200 dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-700'
				} rounded-md flex flex-wrap gap-3`}
			>
				<div class="w-full">
					<p class="text-2xl">{notification.title}</p>
					<p class="text-neutral-400 whitespace-pre-line w-full text-xs">
						{notification.created_at.toDateString()} @ {notification.created_at.toLocaleTimeString(
							'en-US'
						)}
					</p>
				</div>
				<p class="text-neutral-600 dark:text-neutral-300 whitespace-pre-line w-full">
					{notification.body}
				</p>
				<div class="grid justify-end items-center w-full">
					<button
						on:click={() => notification}
						class="px-4 py-2 font-semibold text-sm bg-sky-500/75 hover:bg-sky-600 text-white rounded-md shadow-sm opacity-100 flex items-center"
					>
						Mark as read
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>
