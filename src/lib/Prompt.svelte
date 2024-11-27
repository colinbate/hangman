<script lang="ts">
	let { label }: { label: string } = $props();
	let dialog: HTMLDialogElement | undefined;
	let value = $state('');
	let resolve: ((v: string | undefined) => void) | undefined;
	export function show() {
		if (dialog) {
			dialog.showModal();
			return new Promise<string | undefined>((res) => (resolve = res));
		}
		return Promise.resolve(undefined);
	}

	function close() {
		if (dialog) {
			dialog.close();
		}
		if (resolve) {
			resolve(undefined);
		}
	}

	function result() {
		if (dialog) {
			dialog.close();
		}
		if (resolve) {
			resolve(value);
			value = '';
			resolve = undefined;
		}
	}
</script>

<dialog
	bind:this={dialog}
	class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-5 pt-5 text-left shadow-xl transition-all backdrop:bg-gray-800/80 dark:bg-gray-950 sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
>
	<form onsubmit={result}>
		<div class="sm:flex sm:items-start">
			<div class="w-full text-center sm:text-left">
				<h3
					class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
					id="modal-title"
				>
					{label}
				</h3>
				<div class="mt-2">
					<input
						type="text"
						bind:value
						class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-800 dark:text-white sm:text-sm sm:leading-6"
					/>
				</div>
			</div>
		</div>
		<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
			<button
				type="submit"
				class="inline-flex w-full justify-center rounded-md bg-svelte px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
				>Set</button
			>
			<button
				type="button"
				onclick={close}
				class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
				>Cancel</button
			>
		</div>
	</form>
</dialog>

<style>
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
