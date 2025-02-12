<script context="module" lang="ts">
	export const key = Symbol();

	export interface Context {
		getTabIndex: () => number;
		getTabButtonIndex: () => number;
		currentIndex: Writable<string>;
	}
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	let tabButtonIndex = 0;
	let tabIndex = 0;

	let currentIndex = writable('0');

	setContext<Context>(key, {
		getTabIndex: () => tabIndex++,
		getTabButtonIndex: () => tabButtonIndex++,
		currentIndex
	});
</script>

<div>
	<input type="hidden" class="tab-selector" name="attr_tabs_selected_index" value={$currentIndex} />

	<slot />
</div>

<style lang="scss">
	div {
		width: 100%;
	}
	:global(.charactersheet div.tabs_tab_panel) {
		display: none;
	}

	// if, for whatever reason, you need more than 10 tabs in your sheet,
	// you can edit this @for statement
	@for $i from 0 through 9 {
		:global(.charactersheet
				input.tab-selector[name='attr_tabs_selected_index'][value='#{$i}']
				~ div.tabs_tab_panel.tab_index_#{$i}) {
			display: block;
		}
	}
</style>
