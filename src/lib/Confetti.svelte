<script lang="ts">
  let { type = 'win', btn = 'Restart', onrestart }: {type?: string; btn?: string; onrestart: VoidFunction} = $props();
  let characters = type === 'win' ? ['🥳', '🎉', '✨'] : ['😢', '💀', '🤦'];
  let resetBtn: HTMLButtonElement | undefined;

  let confetti = $state(new Array(100)
  .fill(0)
  .map((_, i) => {
    return {
      id: `c${i}`,
      character: characters[i % characters.length],
      x: Math.random() * 100,
      y: -20 - Math.random() * 100,
      r: 0.1 + Math.random() * 1,
    };
  })
  .sort((a, b) => a.r - b.r));
  
  let frame: number;
  function loop() {
    frame = requestAnimationFrame(loop);
    confetti = confetti.map((emoji) => {
      let y = emoji.y + 0.7 * emoji.r;
      if (y > 120) y = -20;
      return {...emoji, y};
    });
  }

$effect(() => {
  document.body.classList.add('overflow-hidden');
  setTimeout(loop);

  if (resetBtn) {
    resetBtn.focus();
  }

  return () => {
    cancelAnimationFrame(frame);
    document.body.classList.remove('overflow-hidden');
  };
});

function restart(ev: SubmitEvent) {
  ev.preventDefault();
  onrestart();
}
</script>
{#each confetti as c (c.id)}
  <span class="absolute text-[3vw] select-none" style="left: {c.x}%; top: {c.y}%; transform: scale({c.r})"
    >{c.character}</span
  >
{/each}
<form
  onsubmit={restart}
  class="absolute grid inset-0 place-content-center"
>
  <button
    type="submit"
    bind:this={resetBtn}
    class="px-6 py-3 bg-svelte text-white ring-black focus:outline-none focus:ring-4 dark:ring-white text-xl rounded"
    >{btn}</button
  >
</form>
