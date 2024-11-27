<script lang="ts">
	type Props = {
		type?: 'win' | 'lose';
		btn?: string;
		onrestart: VoidFunction;
	};
	let { type = 'win', btn = 'Restart', onrestart }: Props = $props();
	let characters = $derived(type === 'win' ? ['🥳', '🎉', '✨'] : ['😢', '💀', '🤦']);
	let resetBtn: HTMLButtonElement | undefined;

	let confetti = $state(
		new Array(100)
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
			.sort((a, b) => a.r - b.r)
	);

	let frame: number;
	function loop() {
		frame = requestAnimationFrame(loop);
		confetti = confetti.map((emoji) => {
			let y = emoji.y + 0.7 * emoji.r;
			if (y > 120) y = -20;
			return { ...emoji, y };
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
	<span
		class="absolute select-none text-[3vw]"
		style="left: {c.x}%; top: {c.y}%; transform: scale({c.r})">{c.character}</span
	>
{/each}
<form onsubmit={restart} class="absolute inset-0 grid place-content-center">
	<button
		type="submit"
		bind:this={resetBtn}
		class="rounded bg-svelte px-6 py-3 text-xl text-white ring-black focus:outline-none focus:ring-4 dark:ring-white"
		>{btn}</button
	>
</form>
