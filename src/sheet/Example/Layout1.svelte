<div class="main">
	<div class="head">
		<slot name="head" />
	</div>
	<slot />
</div>

<style>
	.main {
		width: 100%;
		height: 500px;
		background-color: #1e1e1e;

		display: grid;

		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: 10px;
	}

	.head {
		grid-column: 1 / 4;
	}
</style>
