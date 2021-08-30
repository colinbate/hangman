<script lang="ts">
import Categories from './Categories.svelte';
import Confetti from './Confetti.svelte';
import Gallows from './Gallows.svelte';

let word = '';
let category = '';
let result = '';

function chooseWord(ev: CustomEvent<{ category: string; chosen: string }>) {
  word = ev.detail.chosen;
  category = ev.detail.category;
}

function celebrate(win: boolean) {
  result = win ? 'win' : 'lose';
}

function reset() {
  word = '';
  category = '';
  result = '';
}
</script>

{#if word}
  {#if result}
    <div class="absolute inset-0">
      <Confetti type={result} on:restart={reset} />
    </div>
  {/if}
  <Gallows
    {word}
    {category}
    on:win={() => celebrate(true)}
    on:lose={() => celebrate(false)}
  />
{:else}
  <Categories on:word={chooseWord} />
{/if}
