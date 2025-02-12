<script context="module" lang="ts" sheetworker>
	import '../lib/Tabs/TabsWorker';
	import { getAttrsAsync } from '../lib/roll20Async';
	import TAS from '../lib/TheAaronSheet';
	TAS.log('Hello World!');
	on('change:level', async () => {
		const attrs = await getAttrsAsync(['level']);
		const level = +attrs.level;
		if (isNaN(level)) return;
		setAttrs({
			hp_max: level * 2,
			mana_max: Math.floor(level * 1.5)
		});
	});
</script>

<script>
	import { Tab, TabButton, TabView } from '../lib/Tabs';
	import ExamplePage1 from './Example/ExamplePage1.svelte';
	import ExamplePage2 from './Example/ExamplePage2.svelte';
	import About from './Example/About.svelte';
</script>

<div>
	<div>
		<TabView>
			<TabButton>Character</TabButton>
			<TabButton>Notes</TabButton>
			<TabButton>About</TabButton>
			<Tab>
				<ExamplePage1 />
			</Tab>
			<Tab>
				<ExamplePage2 />
			</Tab>
			<Tab>
				<About />
			</Tab>
		</TabView>
	</div>
</div>

<style lang="scss">
	div {
		width: 100%;
		div {
			min-width: 790px;
		}
	}
</style>
