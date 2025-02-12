<script>
	import Layout2 from './Layout2.svelte';
</script>

<Layout2>
	<div slot="left">
		<h1>Session Notes</h1>
		<textarea name="attr_session_notes" />
	</div>
	<div slot="right">
		<h1>Character Notes</h1>
		<textarea name="attr_character_notes" />
	</div>
</Layout2>

<style lang="scss">
	textarea {
		width: 97%;
		min-height: 150px;
		resize: vertical;
		background-color: transparent;
		color: white;
	}

	h1 {
		color: white;
	}

	div {
		background-color: #252525;
	}
</style>
