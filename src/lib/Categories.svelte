<script lang="ts">
	import { categories } from './data';
	import Prompt from './Prompt.svelte';
	let { onword }: { onword: (c: string, w: string) => void } = $props();
	let dd: Prompt | undefined;

	function rand(max: number) {
		return Math.floor(Math.random() * max);
	}

	async function select(cat: { name: string; words: string[] }) {
		let chosen: string | undefined;
		if (cat.words.length) {
			const index = rand(cat.words.length);
			chosen = cat.words[index];
		} else {
			chosen = (await dd?.show()) ?? '';
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

<svelte:window on:keydown={nav} />
<div class="mb-6 text-xl font-bold">Choose a category:</div>
<ul class="mx-auto flex w-fit flex-col gap-4">
	{#each categories as cat, i}
		<li>
			<button
				id={`b${i}`}
				type="button"
				class="catbtn w-full rounded bg-svelte px-4 py-2 text-white ring-black focus:outline-none focus:ring-4 dark:ring-white"
				onclick={() => select(cat)}>{cat.name}</button
			>
		</li>
	{/each}
</ul>
<Prompt label="Enter a word:" bind:this={dd} />
