<script lang="ts">
import Categories from './Categories.svelte';
import Confetti from './Confetti.svelte';
import Gallows from './Gallows.svelte';

let word = $state('');
let category = $state('');
let result = $state('');

function chooseWord(c: string, w: string) {
  word = w;
  category = c;
}

function reset() {
  word = '';
  category = '';
  result = '';
}
</script>

{#if word}
  {#if result}
    <div class="fixed inset-0">
      <Confetti type={result} onrestart={reset} />
    </div>
  {/if}
  <Gallows
    {word}
    {category}
    onresult={r => result = r}
  />
{:else}
  <Categories onword={chooseWord} />
{/if}
