<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Tile } from "./Tile";
  export let data: Tile[][] = Array.from({ length: 3 }, () => 
  Array.from({length:3}, () => new Tile("-"))
  );
  export let currentPlayer: string;
  export let gameOver: boolean = false;
  export let disabled: boolean = false;
  const dispatch = createEventDispatcher();
  const handleClick = (e) => {
    dispatch("turn", { btnEvent: e, data: data });
  };
</script>

<div class="grid grid-cols-3 justify-items-center gap-2 bg-transparent ">
  {#each data as row, index}
  {#each row as tile, index2}
    <button
      disabled={tile.value != "-" || gameOver || disabled}
      class="tttbtn"
      class:x={tile.value.toLocaleLowerCase() == "x"}
      class:o={tile.value.toLocaleLowerCase() == "o"}
      class:winner={tile.winner}
      class:taken={tile.value != "-"}
      on:click={(e) => {
        tile.value = currentPlayer;
        handleClick(e);
      }}
    >
      {tile.value}
    </button>
    {/each}

  {/each}
</div>

<style lang="postcss">
  .tttbtn {
    @apply transition hover:bg-gray-300 uppercase;
    @apply text-4xl md:text-5xl bg-white  px-3 py-2 w-full font-bold rounded-lg shadow-sm border-2 border-transparent;
  }
  .tttbtn:disabled{
    @apply pointer-events-none
  }
  .taken{
    @apply text-white border-white border-2
  }
  .x {
    @apply bg-red-500 hover:bg-red-500;
  }
  .o {
    @apply bg-blue-500 hover:bg-blue-500;
  }
  .winner{
    @apply text-white bg-yellow-500 hover:bg-yellow-500 shadow-xl

  }
</style>
