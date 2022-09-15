<script lang="ts">
	import { ArrowLeftSolid, FilterSolid } from 'svelte-awesome-icons';
	import {
		pageTitle,
		darkMode,
		backAction,
		notificationFilter,
		NotificationFilter
	} from '$stores/ui';
	import { page } from '$app/stores';
	import '../app.scss';
	import { toHome } from '$navigate';
	import { fade } from 'svelte/transition';

	/**
	 * Reactive vars
	 */
	$: if ($page.url.pathname === toHome()) {
		$backAction = null;
	} else {
		$backAction = {
			title: 'Back',
			to: toHome()
		};
	}
	$: filterDropdownOpen = false;

	/**
	 * Event handlers
	 */
	function toggleFilterDropdown() {
		filterDropdownOpen = !filterDropdownOpen;
	}
	function handleSelectFitler(filter: NotificationFilter) {
		$notificationFilter = filter;
		filterDropdownOpen = false;
	}
	function handleCloseFilterDropdown() {
		filterDropdownOpen = false;
	}
	function toggleDarkMode() {
		$darkMode = !$darkMode;
	}
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<div class:dark={$darkMode} on:click={() => handleCloseFilterDropdown()}>
	<div class="w-full min-h-screen bg-slate-300 dark:bg-slate-900 dark:text-white">
		<div
			class="w-full fixed flex py-4 px-6"
			class:justify-end={!$backAction}
			class:justify-between={$backAction}
		>
			{#if $backAction}
				<a
					href={$backAction.to}
					class="py-2 font-semibold text-sm text-sky-600/75 hover:text-sky-700 dark:text-sky-500/75 hover:dark:text-sky-600 opacity-100 flex items-center"
				>
					<span class="pr-2">
						<ArrowLeftSolid size="14" />
					</span>
					<span>{$backAction.title}</span>
				</a>
			{:else}
				<div />
			{/if}
			<div class="flex gap-3">
				<div class="relative inline-block text-left">
					<button
						on:click|stopPropagation={() => toggleFilterDropdown()}
						class="px-4 py-2 font-semibold text-sm bg-neutral-500/75 hover:bg-neutral-600 text-white rounded-md shadow-sm opacity-100 flex items-center"
					>
						<FilterSolid size="14" /> <span class="pl-2">{$notificationFilter}</span>
					</button>
					{#if filterDropdownOpen}
						<div
							on:click|stopPropagation={() => {
								/* no-opt */
								/**
								 * To prevent premature closing of dropdown
								 */
							}}
							in:fade={{ duration: 100 }}
							out:fade={{ duration: 75 }}
							class="origin-top-right absolute right-0 mt-2 w-56 rounded-md overflow-hidden shadow-lg bg-white dark:bg-slate-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-button"
						>
							{#each Object.values(NotificationFilter) as filter (filter)}
								<button
									class="hover:bg-neutral-100 dark:hover:bg-slate-800 text-left px-3 py-2 w-full"
									on:click|stopPropagation={() => handleSelectFitler(filter)}
								>
									{filter}
								</button>
							{/each}
						</div>
					{/if}
				</div>
				<button
					on:click={() => toggleDarkMode()}
					class="px-4 py-2 font-semibold text-sm bg-sky-500/75 hover:bg-sky-600 text-white rounded-md shadow-sm opacity-100 flex items-center"
				>
					{$darkMode ? 'Dark' : 'Light'}
				</button>
			</div>
		</div>
		<div class="px-6 pt-20 py-4 h-100">
			<slot />
		</div>
	</div>
</div>
