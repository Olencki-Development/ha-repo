<script lang="ts">
	import '../app.scss';
	import { pageTitle } from '$stores/ui';
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<div class="w-full min-h-screen bg-slate-300 dark:bg-slate-900 dark:text-white">
	<div class="w-full fixed flex py-4 px-6 justify-end">
		<div class="flex gap-3">
			<slot name="navbar" />
		</div>
	</div>
	<div class="px-6 pt-20 py-4 h-100">
		<slot />
	</div>
</div>
