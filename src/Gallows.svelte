<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Stickman from "./Stickman.svelte";
  const dispatch = createEventDispatcher();
export let word = '';
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({letter, used: false}));
let blanks: string[] = Array(word.length).fill('_');
let found = 0;
let step = 0;
function chooseLetter(index: number) {
  letters[index].used = true;
  const choice = letters[index].letter;
  let pos = word.indexOf(choice.toLowerCase());
  if (pos > -1) {
    while (pos > -1) {
      blanks[pos] = choice.toLowerCase();
      found += 1;
      pos = word.indexOf(choice.toLowerCase(), pos + 1);
    }
    blanks = blanks;
    if (found === word.length) {
      dispatch('win');
    }
  } else {
    step += 1;
    if (step >= 9) {
      dispatch('lose');
    }
  }
}
</script>

<div class="max-w-[10rem] mx-auto">
  <Stickman {step}/>
</div>
<div class="m-4 flex items-center justify-center">
{#each blanks as blank}
  <div class="text-3xl mx-2 w-7">{blank}</div>
{/each}
</div>
{#each letters as letter, i}
  <button type="button" class="py-1 px-2 rounded-sm w-8 bg-svelte text-white m-1" class:!bg-gray-700={letter.used} disabled={letter.used} on:click={() => chooseLetter(i)}>{letter.letter}</button>
{/each}

