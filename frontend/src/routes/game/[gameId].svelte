<script lang="ts">
  import { getStores, navigating, page, session, updated } from "$app/stores";
  import Board from "$lib/Board.svelte";
  let revealCode: boolean = false;
</script>

<div class="flex justify-center">
  <div class="container my-auto px-2 max-w-4xl">
    <div class="content-center text-center flex flex-col items-center">
      <h1 class="text-white font-bold text-4xl my-5 animate-pulse">
        Waiting for opponent...
      </h1>
      <button class="revealCode" on:click="{(()=>revealCode=!revealCode)}">
        {#if revealCode}
        {$page.params.gameId}
        {:else}
        Click to reveal code!
        {/if}
    </button>
    </div>
    <Board />
  </div>
</div>
<style lang="postcss">
.revealCode{
    @apply bg-white max-w-fit my-5 p-2 rounded-xl font-bold select-none shadow-2xl ;
    @apply hover:text-blue-500;
    @apply transition-colors ease-in-out duration-300;
}
</style>
