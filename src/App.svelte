<script lang="ts">
import ModeSwitcher from './ModeSwitcher.svelte';
import Tailwindcss from './Tailwindcss.svelte';
import Game from './Game.svelte';
</script>

<Tailwindcss />
<ModeSwitcher />
<main class="p-4 mx-auto text-center max-w-xl">
  <h1 class="uppercase text-6xl leading-normal font-thin text-svelte">
    Hangman
  </h1>
  <Game />
</main>
