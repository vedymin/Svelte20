<script lang="ts">
	export let name: string;
	export let type = 'text';
	export let readonly = false;

	export let style: string | undefined = undefined;

	$: name = 'attr_' + name.toLowerCase().replaceAll(' ', '_');
</script>

{#if !readonly}
	<input id="input" {name} {type} {style} />
{:else}
	<span {name} {style} />
{/if}

<style>
	span {
		width: 100%;
		height: 20px;
		background-color: black;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	#input {
		width: 100%;
		display: inline-block;
		border: 1px solid darkgray;
		border-radius: 4px;
		box-sizing: border-box;
		color: white;
		background-color: black;
		text-align: center;
	}
</style>
