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

function moveFocus(dir: 1 | -1) {
  const btns = document.querySelectorAll('button');
  if (document.activeElement.tagName === 'BUTTON') {
    const cid = document.activeElement.id;
    const index = parseInt(cid.replace('b', ''), 10);
    const next = btns[(btns.length + index + dir) % btns.length];
    next.focus();
  } else {
    const next = btns[dir > 0 ? 0 : btns.length - 1];
    next.focus();
  }
}

function nav(ev: KeyboardEvent) {
  if (ev.key === 'ArrowDown') {
    moveFocus(1);
  } else if (ev.key === 'ArrowUp') {
    moveFocus(-1);
  }
}
</script>
<svelte:window on:keydown={nav}/>
<div>Choose a category:</div>
<ul class="flex flex-col mx-auto w-fit">
  {#each categories as cat, i}
    <li class="m-3">
      <button
        id={`b${i}`}
        type="button"
        class="px-4 py-2 rounded bg-svelte text-white w-full focus:outline-none focus:ring-4 ring-black dark:ring-white"
        on:click={() => select(cat)}>{cat.name}</button
      >
    </li>
  {/each}
</ul>
