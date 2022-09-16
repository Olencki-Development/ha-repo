<script>
	import { page } from '$app/stores';
</script>

<div class="flex justify-center items-center h-screen w-full">
	<div>
		<h1>{$page.status}: {$page.error?.message}</h1>
		<pre>{$page.error?.stack}</pre>
	</div>
</div>
