<div class="layout-2">
	<div class="left">
		<slot name="left" />
	</div>
	<div class="right">
		<slot name="right" />
	</div>
</div>

<style lang="scss">
	.layout-2 {
		width: 100%;
		min-height: 800px;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: 20px;
		background-color: #1e1e1e;
	}

	.left {
		width: 100%;
	}

	.right {
		width: 100%;
	}
</style>
