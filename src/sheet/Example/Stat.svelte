<script lang="ts">
	import Input from './Input.svelte';

	export let name: string;
	export let label: string | undefined = undefined;
	export let readonly = false;
	export let roll: string | undefined = undefined;
	export let rollName: string | undefined = undefined;

	$: label ??= name;
</script>

<div class="main">
	{#if roll === undefined}
		<h1>{label}</h1>
	{:else}
		<button type="roll" value={roll} name={rollName}><h1>{label}</h1></button>
	{/if}
	<Input {name} {readonly} style="width: 75%; height: 40px" />
</div>

<style>
	.main {
		width: 100%;
		height: 100%;
		background-color: lightgray;

		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}
</style>
