<script>
import { createEventDispatcher, onMount } from 'svelte';
export let type = 'win';
export let btn = 'Restart';
let characters = type === 'win' ? ['🥳', '🎉', '✨'] : ['😢', '💀', '🤦'];

let confetti = new Array(100)
  .fill()
  .map((_, i) => {
    return {
      character: characters[i % characters.length],
      x: Math.random() * 100,
      y: -20 - Math.random() * 100,
      r: 0.1 + Math.random() * 1,
    };
  })
  .sort((a, b) => a.r - b.r);

onMount(() => {
  let frame;

  function loop() {
    frame = requestAnimationFrame(loop);

    confetti = confetti.map((emoji) => {
      emoji.y += 0.7 * emoji.r;
      if (emoji.y > 120) emoji.y = -20;
      return emoji;
    });
  }

  loop();

  document.body.classList.add('overflow-hidden');

  const btn = document.querySelector('#restart');
  btn.focus();

  return () => {
    cancelAnimationFrame(frame);
    document.body.classList.remove('overflow-hidden');
  };
});
const dispatch = createEventDispatcher();
function restart() {
  dispatch('restart');
}
</script>
{#each confetti as c}
  <span style="left: {c.x}%; top: {c.y}%; transform: scale({c.r})"
    >{c.character}</span
  >
{/each}
<form
  on:submit|preventDefault={restart}
  class="absolute grid inset-0 place-content-center"
>
  <button
    id="restart"
    type="submit"
    class="px-6 py-3 bg-svelte text-white ring-black focus:outline-none focus:ring-4 dark:ring-white text-xl rounded"
    >{btn}</button
  >
</form>

<style>

span {
  position: absolute;
  font-size: 3vw;
  user-select: none;
}
</style>
