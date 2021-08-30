<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { categories } from './data';

const dispatch = createEventDispatcher();

function rand(max: number) {
  return Math.floor(Math.random() * max);
}

function select(cat: { name: string; words: string[] }) {
  const index = rand(cat.words.length);
  const chosen = cat.words[index];
  dispatch('word', { category: cat.name, chosen });
}
</script>

<div>Choose a category:</div>
<ul class="flex flex-col mx-auto w-fit">
  {#each categories as cat}
    <li class="m-3">
      <button
        type="button"
        class="px-4 py-2 rounded bg-svelte text-white w-full"
        on:click={() => select(cat)}>{cat.name}</button
      >
    </li>
  {/each}
</ul>
