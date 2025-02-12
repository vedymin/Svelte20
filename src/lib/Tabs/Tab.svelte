<script lang="ts">
	import { key } from './TabView.svelte';
	import type { Context } from './TabView.svelte';
	import { getContext } from 'svelte';

	const context = getContext<Context>(key);

	const index = context.getTabIndex();
</script>

<div class="tabs_tab_panel tab_index_{index}">
	<slot />
</div>

<style>
	div {
		width: 100%;
	}
</style>
