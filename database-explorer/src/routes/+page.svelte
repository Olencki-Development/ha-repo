<script lang="ts">
	import Modal from '$lib/ui/Modal.svelte';
	import { DatabaseConfig, DatabaseType } from '$lib/models/DatabaseConfig';
	import { getFieldError, hasFieldError, validateForm, type FormErrors } from '$lib/form';

	const form: Partial<DatabaseConfig> = {
		type: DatabaseType.PG,
		host: '127.0.0.1',
		port: 5432,
		name: '',
		username: null,
		password: null
	};
	let formErrors: FormErrors<DatabaseConfig> | null = null;

	/**
	 * Reactive vars
	 */
	$: addConnectionModalOpen = false;

	/**
	 * Event handlers
	 */
	function handleOpenModal() {
		addConnectionModalOpen = true;
	}
	function handleCloseModal() {
		addConnectionModalOpen = false;
	}
	function handleAddConnection() {
		formErrors = null;
		const result = validateForm(DatabaseConfig, form);
		if (result.status === 'success') {
			console.log(result.values);
			// handleCloseModal();
		} else {
			formErrors = result.errors;
		}
	}
</script>

<div class="flex justify-center items-center h-screen w-screen">
	<div class="bg-slate-100 dark:bg-slate-700 flex py-8 px-6 rounded-md max-w-4xl">
		<div class="w-1/3 flex flex-col justify-center items-center gap-3 text-center">
			<div>
				<p class="text-xl font-light">Welcome to</p>
				<h1 class="text-3xl font-semibold">Database Explorer</h1>
			</div>
			<p class="text-sm">
				A local based web app to explore remote databases. Start by choosing an existing database or
				adding a new connection.
			</p>
		</div>
		<div class="w-2/3 flex flex-col justify-between">
			<div class="flex flex-col gap-2" />
			<button class="text-xs text-blue-500 hover:text-blue-600" on:click={handleOpenModal}
				>Create a new connection...</button
			>
		</div>
	</div>
</div>
<Modal open={addConnectionModalOpen} on:close={handleCloseModal}>
	<form on:submit|preventDefault={handleAddConnection} class="flex flex-col gap-2">
		<h3 class="text-lg border-b border-slate-300">Create a connection</h3>
		<div class="xl:w-96">
			<label for="host" class="form-label text-sm inline-block mb-2 text-gray-700"> Host </label>
			<input
				bind:value={form.host}
				type="text"
				class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
				id="host"
				placeholder="127.0.0.1"
			/>
			{#if hasFieldError(formErrors, 'host')}<p class="text-xs text-red-600">
					{getFieldError(formErrors, 'host')}
				</p>{/if}
		</div>
		<div class="xl:w-96">
			<label for="port" class="form-label text-sm inline-block mb-2 text-gray-700"> Port </label>
			<input
				bind:value={form.port}
				type="number"
				class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
				id="port"
				placeholder="5432"
			/>
			{#if hasFieldError(formErrors, 'port')}<p class="text-xs text-red-600">
					{getFieldError(formErrors, 'port')}
				</p>{/if}
		</div>
		<div class="xl:w-96">
			<label for="name" class="form-label text-sm inline-block mb-2 text-gray-700"> Name </label>
			<input
				bind:value={form.name}
				type="text"
				class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
				id="name"
				placeholder="my-db"
			/>
			{#if hasFieldError(formErrors, 'name')}<p class="text-xs text-red-600">
					{getFieldError(formErrors, 'name')}
				</p>{/if}
		</div>
		<div class="xl:w-96">
			<label for="username" class="form-label text-sm inline-block mb-2 text-gray-700">
				Username (optional)
			</label>
			<input
				bind:value={form.username}
				type="text"
				class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
				id="username"
				placeholder=""
			/>
			{#if hasFieldError(formErrors, 'username')}<p class="text-xs text-red-600">
					{getFieldError(formErrors, 'username')}
				</p>{/if}
		</div>
		<div class="xl:w-96">
			<label for="Password" class="form-label text-sm inline-block mb-2 text-gray-700">
				Password (optional)
			</label>
			<input
				bind:value={form.password}
				type="password"
				class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
				id="password"
				placeholder=""
			/>
			{#if hasFieldError(formErrors, 'password')}<p class="text-xs text-red-600">
					{getFieldError(formErrors, 'password')}
				</p>{/if}
		</div>
		<div class="xl:w-96 text-right">
			<button type="submit" class="">Save</button>
		</div>
	</form>
</Modal>
