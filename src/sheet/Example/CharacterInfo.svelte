<script>
	import LabeledInput from './LabeledInput.svelte';
	import Input from './Input.svelte';
</script>

<div class="main">
	<div class="top">
		<Input name="character name" style="width: 50%; height: 50%; font-size: 40px;" />
	</div>
	<div class="bottom">
		<LabeledInput name="Class" />
		<LabeledInput name="Level" type="number" />
		<LabeledInput name="Player" />
	</div>
</div>

<style>
	.main {
		widows: 100%;
		height: 100%;
		margin: 10px;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(2, 1fr);
	}

	.bottom {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
