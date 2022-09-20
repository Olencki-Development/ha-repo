<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let open = false;

	type DispatchEvents = {
		close: undefined;
	};
	const dispatch = createEventDispatcher<DispatchEvents>();

	/**
	 * Event handlers
	 */
	function handleClose() {
		return dispatch('close');
	}
</script>

{#if open}
	<div
		style="top: 0; left: 0;"
		class="fixed h-screen w-screen bg-slate-700/75 flex justify-center items-center"
		on:click|self={handleClose}
	>
		<div class="bg-white rounded-md p-6">
			<slot />
		</div>
	</div>
{/if}
