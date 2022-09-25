<script lang="ts">
	import { FilterSolid } from 'svelte-awesome-icons';
	import { pageTitle, theme, ColorTheme, notificationFilter, NotificationFilter } from '$stores/ui';
	import '../app.scss';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	/**
	 * Reactive vars
	 */
	$: filterDropdownOpen = false;
	$: colorModeDropdownOpen = false;
	$: darkMode =
		$theme.color === ColorTheme.DARK ||
		($theme.color === ColorTheme.SYSTEM &&
			browser &&
			window.matchMedia('(prefers-color-scheme: dark)').matches);
	$: isEmbeded = $page.url.searchParams.get('embed') === 'true';

	/**
	 * Event handlers
	 */
	function handleCloseFiltersDropdown() {
		filterDropdownOpen = false;
		colorModeDropdownOpen = false;
	}
	function handleSelectFitler(filter: NotificationFilter) {
		$notificationFilter = filter;
		handleCloseFiltersDropdown();
	}
	function toggleFilterDropdown() {
		filterDropdownOpen = !filterDropdownOpen;
	}
	function handleSelectColorMode(color: ColorTheme) {
		$theme = { color };
		handleCloseFiltersDropdown();
	}
	function toggleColorModeDropdown() {
		colorModeDropdownOpen = !colorModeDropdownOpen;
	}
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<div class:dark={darkMode} on:click={() => handleCloseFiltersDropdown()}>
	<div class="w-full min-h-screen bg-slate-300 dark:bg-slate-900 dark:text-white">
		{#if !isEmbeded}
			<div class="w-full fixed flex py-4 px-6 justify-end">
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
					<div class="relative inline-block text-left">
						<button
							disabled={!$theme.color}
							on:click|stopPropagation={() => toggleColorModeDropdown()}
							class="px-4 py-2 font-semibold text-sm bg-sky-500/75 hover:bg-sky-600 text-white rounded-md shadow-sm opacity-100 flex items-center"
						>
							{$theme.color ?? 'Loading...'}
						</button>
						{#if colorModeDropdownOpen}
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
								{#each Object.values(ColorTheme) as color (color)}
									<button
										class="hover:bg-neutral-100 dark:hover:bg-slate-800 text-left px-3 py-2 w-full"
										on:click|stopPropagation={() => handleSelectColorMode(color)}
									>
										{color}
									</button>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}
		<div class={`p-6 ${isEmbeded ? '' : 'pt-20'} h-100`}>
			<slot />
		</div>
	</div>
</div>
