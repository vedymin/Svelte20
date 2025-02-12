<script>
	let language = 'PUG';
</script>

<template lang="pug">
	div
		h1 Example character sheet buildt with Svelte
		h3 
			u https://svelte.dev/

		p Developed by Naratna. For more information, visit
		p
			u https://github.com/Naratna/Svelte20

		br
		br
		p This part of the sheet was written in {language}
</template>

<style lang="sass">
	div 
		background-color: #1e1e1e
		width: 1fr
		height: 500px
		padding: 10px
		color: white

	h1, h3, p 
		color: white
		margin: 5px
</style>
