<script>
	import Layout1 from './Layout1.svelte';
	import CharacterInfo from './CharacterInfo.svelte';
	import Stat from './Stat.svelte';
</script>

<Layout1>
	<CharacterInfo slot="head" />
	<Stat name="hp" label="Hit Points" />
	<Stat name="hp_max" label="Max Hit Points" readonly />
	<Stat name="strength" roll={'/roll @{strength}d4'} rollName="roll_strength" />
	<Stat name="Mana" />
	<Stat name="mana_max" label="Max Mana" readonly />
	<Stat name="intelligence" roll={'/roll @{intelligence}d4'} rollName="roll_intelligence" />
</Layout1>
