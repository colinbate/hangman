<script lang="ts">
	import Stickman from './Stickman.svelte';

	type Props = {
		word: string;
		category: string;
		onresult: (result: 'win' | 'lose') => void;
	};

	let { word = '', category = '', onresult }: Props = $props();
	const letters = $state(
		'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => ({ letter, used: false }))
	);
	let blanks: string[] = $state(Array(word.length).fill('_'));
	let found = 0;
	let step = $state(0);
	function chooseLetter(letter: string) {
		const uc = letter.toUpperCase();
		const index = letters.findIndex((c) => c.letter === uc);
		if (letters[index].used) {
			return;
		}
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
				onresult('win');
			}
		} else {
			step += 1;
			if (step >= 9) {
				for (let ii = 0; ii < blanks.length; ii += 1) {
					if (blanks[ii] === '_') {
						blanks[ii] = word.charAt(ii).toUpperCase();
					}
				}
				blanks = blanks;
				onresult('lose');
			}
		}
	}
	function type(ev: KeyboardEvent) {
		const code = ev.key.charCodeAt(0);
		if (ev.key.length === 1 && ((code >= 97 && code <= 122) || (code >= 65 && code <= 90))) {
			chooseLetter(ev.key);
		}
	}
</script>

<svelte:window on:keydown={type} />
<div class="mx-auto max-w-[10rem]">
	<Stickman {step} />
</div>
<div class="m-4">Category: {category}</div>
<div class="m-4 flex items-center justify-center">
	{#each blanks as blank}
		<div class="mx-2 w-7 text-3xl" class:text-svelte={blank !== '_' && blank < 'a'}>
			{blank.toLowerCase()}
		</div>
	{/each}
</div>
{#each letters as letter}
	<button
		type="button"
		class="m-1 w-8 rounded-sm bg-svelte px-2 py-1 text-white"
		class:!bg-gray-700={letter.used}
		class:cursor-not-allowed={letter.used}
		disabled={letter.used}
		onclick={() => chooseLetter(letter.letter)}>{letter.letter}</button
	>
{/each}
