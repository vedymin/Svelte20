<script lang="ts">
	import Input from './Input.svelte';

	export let name: string;
	export let type = 'text';
</script>

<div class="main">
	<h4>{name}</h4>
	<Input {type} {name} />
</div>

<style>
	.main {
		height: 50px;
		width: 250px;
		background-color: #0c0c0d;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
		color: white;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		align-items: center;
		text-align: center;
		padding-right: 5px;
	}

	h4 {
		margin: 0;
		color: white;
	}
</style>
