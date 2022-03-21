<script lang="ts">
  import { getStores, navigating, page, session, updated } from "$app/stores";
  import Board from "$lib/Board.svelte";
  import { onMount } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";

  let currentPlayer: string = "X";
  let data: string[];
  onMount(() => {
    if (window.localStorage.getItem("singlePlayerGameState") != null) {
      let savedGameData = JSON.parse(
        window.localStorage.getItem("singlePlayerGameState")
      );
      currentPlayer = savedGameData.player;
      data = savedGameData.data;
    }
  });
  function handleTurn(event) {
    console.log(event.detail.data);
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    window.localStorage.setItem(
      "singlePlayerGameState",
      JSON.stringify({ player: currentPlayer, data: event.detail.data })
    );
  }
  const reset = () => {
    console.log("Resetting...");
    window.localStorage.removeItem("singlePlayerGameState");
    currentPlayer = "X";
    data = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    toast.push({ msg: "Resetting!", duration: 3000 });
  };
</script>

<div class="flex justify-center">
  <div class="container my-auto px-2 max-w-4xl">
    <div class="content-center text-center flex flex-col items-center">
      <h1 class="text-white font-bold text-4xl my-5">
        {currentPlayer}'s Turn!
      </h1>
    </div>
    <Board {currentPlayer} on:turn={handleTurn} bind:data />
    <button on:click={reset}>Reset</button>
  </div>
</div>

<style lang="postcss">
</style>
