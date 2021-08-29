<script lang="ts">
import Categories from "./Categories.svelte";
import Confetti from "./Confetti.svelte";
import Gallows from "./Gallows.svelte";

let word = '';
let result = '';

function chooseWord(ev: CustomEvent<string>) {
  word = ev.detail;
}

function celebrate(win: boolean) {
  result = win ? 'win' : 'lose';
}
</script>
{#if word}
  {#if result}
  <div class="absolute inset-0">
    <Confetti type={result} />
  </div>
  {/if}
<Gallows {word} on:win={() => celebrate(true)} on:lose={() => celebrate(false)}/>
{:else}
<Categories on:word={chooseWord} />
{/if}