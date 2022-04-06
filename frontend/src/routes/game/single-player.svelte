<script lang="ts">
  import { getStores, navigating, page, session, updated } from "$app/stores";
  import Board from "$lib/Board.svelte";
  import { onMount } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import { Tile } from "$lib/Tile";
  import Loading from "$lib/Loading.svelte";
  let currentPlayer: string = "X";
  let winner: string;
  let data: Tile[][];
  async function loadData() {
    if (window.localStorage.getItem("singlePlayerGameState") != null) {
      let savedGameData = JSON.parse(
        window.localStorage.getItem("singlePlayerGameState")
      );
      currentPlayer = savedGameData.player;
      data = savedGameData.data;
      if(Tile.checkWinner(currentPlayer, savedGameData.data)){
        winner = currentPlayer;
      }
      return true;
    } else {
      return true;
    }
  }
  function handleTurn(event) {
    if(Tile.checkWinner(currentPlayer, event.detail.data)){
      winner = currentPlayer;
    }else{
      currentPlayer = currentPlayer == "X" ? "O" : "X";
    }
    window.localStorage.setItem(
      "singlePlayerGameState",
      JSON.stringify({ player: currentPlayer, data: event.detail.data })
    );
    
  }
  const reset = () => {
    console.debug("Resetting...");
    window.localStorage.removeItem("singlePlayerGameState");
    currentPlayer = "X";
    data = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => new Tile("-"))
    );
    winner = "";
    toast.push({ msg: "Resetting!", duration: 3000 });
  };
</script>
<svelte:head>
  <title>Single Player</title>
</svelte:head>
{#await loadData()}
  <Loading>Loading Game Data..</Loading>
{:then}
  <div class="flex justify-center">
    <div class="container my-auto px-2 max-w-4xl">
      <div class="content-center text-center flex flex-col items-center">
        {#if winner == "X" || winner =="O"}
        <h1 class="text-white font-bold text-4xl my-5">
          {winner} has won! They are better than you!!
        </h1>
        {:else}
        <h1 class="text-white font-bold text-4xl my-5">
          {currentPlayer}'s Turn!
        </h1>
        {/if}
      </div>
      <Board {currentPlayer} on:turn={handleTurn} bind:data gameOver={winner == "X" || winner == "O"} />
      <br />
      <div class="text-center">
        <button on:click={reset} class="btn">Reset</button>
        <a href="/" class="btn">Go Home</a>
      </div>
    </div>
  </div>
{/await}

<style lang="postcss">
  .btn {
    @apply bg-blue-500 text-white appearance-none font-bold px-4 py-2 rounded-md text-center shadow-lg;
    @apply hover:bg-blue-600;
    @apply transition ease-in-out duration-300;
  }
</style>
