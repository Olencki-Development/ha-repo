<script lang="ts">
	import { ArrowLeftSolid } from 'svelte-awesome-icons';
	import { pageTitle, darkMode, backAction } from '$stores/ui';
	import { page } from '$app/stores';
	import '../app.scss';
	import { toHome } from '$navigate';

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

	/**
	 * Event handlers
	 */
	function toggleDarkMode() {
		$darkMode = !$darkMode;
	}
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<div class:dark={$darkMode}>
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
			<button
				on:click={() => toggleDarkMode()}
				class="px-4 py-2 font-semibold text-sm bg-sky-500/75 hover:bg-sky-600 text-white rounded-md shadow-sm opacity-100 flex items-center"
			>
				{$darkMode ? 'Dark' : 'Light'}
			</button>
		</div>
		<div class="px-6 pt-20 py-4 h-100">
			<slot />
		</div>
	</div>
</div>
