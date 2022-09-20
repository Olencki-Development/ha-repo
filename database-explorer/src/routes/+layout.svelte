<script lang="ts">
	import '../app.scss';
	import { pageTitle } from '$stores/ui';
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<div class="w-screen h-screen bg-slate-300 dark:bg-slate-900 dark:text-white">
	<slot />
</div>
