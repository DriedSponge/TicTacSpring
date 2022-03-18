<script lang="ts">
  import { createEventDispatcher } from 'svelte';◘
 export let data: any = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
 export let currentPlayer: string;
 let gameOver: boolean = false;
 const dispatch = createEventDispatcher();
  const handleClick = (e, tile) =>{
    data[tile]= currentPlayer;
    dispatch("turn",{btnEvent:e,data:data})
  }
</script>

<div class="grid grid-cols-3 justify-items-center  bg-white">
  {#each data as tile, index}
    <button disabled="{tile!="-" || gameOver}" class="tttbtn" on:click="{((e)=>{handleClick(e,index)})}">
      {tile}
    </button>
  {/each}
</div>
<style lang="postcss">
    .tttbtn{
        @apply transition hover:bg-gray-300;
        @apply text-4xl border-black border md:text-5xl bg-white  px-3 py-2 w-full font-bold;
    }
</style>