<script lang="ts">
	import { key } from './TabView.svelte';
	import type { Context } from './TabView.svelte';
	import { getContext } from 'svelte';

	export let style = '';

	const context = getContext<Context>(key);
	const index = context.getTabButtonIndex();
	const currentIndex = context.currentIndex;
</script>

<button
	on:click={() => currentIndex.set(String(index))}
	type="action"
	name="act_tabs_switch_button"
	value={index}
	{style}
>
	<slot />
</button>
