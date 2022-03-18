<script lang="ts">
    import { getStores, navigating, page, session, updated } from "$app/stores";
    import Board from "$lib/Board.svelte";
    import { onMount } from 'svelte';
    let currentPlayer: string = "X";
    let data: any;
	onMount(() => {
        if(window.localStorage.getItem("singlePlayerGameState") != null){
            let savedGameData = JSON.parse(window.localStorage.getItem("singlePlayerGameState"))
            currentPlayer = savedGameData.player;
            data = savedGameData.data;
        }
        
	});
    function handleTurn(event){
        console.log(event.detail.data)
        currentPlayer= currentPlayer == "X" ? "O" : "X";
        window.localStorage.setItem("singlePlayerGameState", JSON.stringify({player:currentPlayer,data:event.detail.data})) 
    }
  </script>
  
  <div class="flex justify-center">
    <div class="container my-auto px-2 max-w-4xl">
      <div class="content-center text-center flex flex-col items-center">
        <h1 class="text-white font-bold text-4xl my-5">
          {currentPlayer}'s Turn!
        </h1>
  
      </div>
      <Board currentPlayer="{currentPlayer}" on:turn="{handleTurn}" bind:data={data}  />
    </div>
  </div>
  <style lang="postcss">

  </style>
  