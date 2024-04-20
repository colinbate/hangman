<script lang="ts">
	import ModeSwitcher from './lib/ModeSwitcher.svelte';
	import Game from './lib/Game.svelte';
</script>

<ModeSwitcher />
<main class="p-4 mx-auto text-center max-w-xl">
	<h1 class="uppercase text-6xl leading-normal font-thin text-svelte">Hangman</h1>
	<Game />
</main>
