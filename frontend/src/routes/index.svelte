<script context="module" lang="ts">
	export const prerender = true;
	function getExampleName(): string {
		let names: string[] = ["John Doe...", "Jane Doe..."];
		let rand: number = Math.round(Math.random());
		return names[rand];
	}
</script>

<svelte:head>
	<title>Tic Tac Toe</title>
</svelte:head>

<h1 class="text-center text-5xl font-bold">Tic Tac Toe!</h1>
<br />
<div class="container my-auto">
	<form>
		<div class="flex flex-col">
			<div class="w-full">
				<input
					name="name"
					class="w-full rounded-t-lg rounded-b-none border-gray-100 border-2 focus:border-blue-20"
					placeholder={getExampleName()}
				/>
			</div>
			<div class="w-full">
				<button
					type="submit"
					class="transition ease-in-out duration-300 w-full"
					>GO</button
				>
			</div>
		</div>
	</form>
</div>

<style lang="postcss">
	button {
		@apply py-2 appearance-none rounded-b-lg border-t-0 rounded-t-none shadow-lg bg-blue-500 hover:bg-green-400 text-white;
	}
	input {
		@apply p-2;
	}
</style>
