<script lang="ts">
  import { createEventDispatcher } from 'svelte';
import { categories } from './data';

const dispatch = createEventDispatcher();

function rand(max: number) {
  return Math.floor(Math.random() * max);
}

function select(words: string[]) {
  const index = rand(words.length);
  const chosen = words[index];
  dispatch('word', chosen);
}
</script>
<div>Choose a category:</div>
<ul>
  {#each categories as cat}
  <li class="m-3"><button type="button" class="px-3 py-1 rounded bg-svelte text-white" on:click={() => select(cat.words)}>{cat.name}</button></li>
  {/each}
</ul>