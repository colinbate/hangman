<script lang="ts">
import { categories } from './data';
import Prompt from './Prompt.svelte';
let { onword }: { onword: (c: string, w: string) => void } = $props();
let dd: Prompt | undefined;

function rand(max: number) {
  return Math.floor(Math.random() * max);
}

async function select(cat: { name: string; words: string[] }) {
  let chosen: string;
  if (cat.words.length) {
    const index = rand(cat.words.length);
    chosen = cat.words[index];
  } else {
    chosen = await dd.show() ?? '';
  }
  if (chosen) {
    onword(cat.name, chosen.toLowerCase());
  }
}

function moveFocus(dir: 1 | -1) {
  const btns = document.querySelectorAll<HTMLButtonElement>('.catbtn');
  if (document.activeElement?.classList.contains('catbtn')) {
    const cid = document.activeElement.id;
    const index = parseInt(cid.replace('b', ''), 10);
    console.log(`cid: ${cid} index: ${index}`);
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
        class="catbtn px-4 py-2 rounded bg-svelte text-white w-full focus:outline-none focus:ring-4 ring-black dark:ring-white"
        onclick={() => select(cat)}>{cat.name}</button
      >
    </li>
  {/each}
</ul>
<Prompt label="Enter a word:" bind:this={dd} />