<script lang="ts">
  import { getStores, navigating, page, session, updated } from "$app/stores";
  import Board from "$lib/Board.svelte";
  import { goto } from "$app/navigation";
  import { io } from "socket.io-client";
  import { onMount, onDestroy } from "svelte";
  import { object, string } from "yup";
  import { toast } from "@zerodevx/svelte-toast";
  import { isAuthenticated, user } from "$lib/store";
  import type { Tile } from "$lib/Tile";

  const socket = io("http://localhost:8080/", { withCredentials: true });
  let data: Tile[][];
  let symbol: string = "";
  let winner: string = "";
  let currentPlayer: string = "";
  let draw: boolean = false;
  let chatMsg: string = "";
  let opponent: string = "";
  let code: string = "";
  let chatMsgs: ChatMessage[] = [];
  let revealCode: boolean = false;

  interface ChatMessage {
    from: string;
    content: string;
    self?: boolean;
  }

  socket.on("game:playerJoined", (data) => {
    opponent = data.player;
  });
  socket.on("game:playerDisconnected", (data) => {
    console.log(data.message);
    goto("/");
  });
  
  socket.on("game:winner", (winData) => {
    data = winData.move;
    winner = winData.winner;
  });
  socket.on("game:draw", (drawData) => {
    data = drawData.move;
    draw = true;
  });
  socket.on("game:moveMade", (moveData) => {
    data = moveData.move;
    currentPlayer = moveData.turn;
  });
  // Fetch user Stuff on Load.
  onMount(async () => {
    $user.gameId = window.localStorage.getItem("gameId");
    code = $user.gameId;
    socket.emit("game:connect", (response) => {
      if (!response.success) {
        goto("/join");
      }
      opponent = response.opponent;
      symbol = response.symbol;
      currentPlayer = response.turn;
    });
  });

  function handleTurn(event) {
    console.log(event.detail.data);
    currentPlayer = "o";
    socket.emit("makeMove", { move: event.detail.data }, (response) => {
      currentPlayer = response.turn;
      if (!response.success) {
        console.log(response.message);
        data = response.data;
      }
    });
  }
  onDestroy(async () => {
    socket.close();
  });
  function sendMsg() {
    socket.emit("game:chat", { content: chatMsg, gameId: code });
    chatMsgs = [...chatMsgs, { from: "You", content: chatMsg, self: true }];
    console.log(chatMsgs);
    console.log("Sending " + chatMsg);
    chatMsg = "";
  }
  socket.on("game:chat", (data) => {
    console.log("Received Chat Message From " + data.from);
    chatMsgs = [...chatMsgs, { from: data.from, content: data.content }];
  });
</script>

<div class="flex justify-center">
  <div class="container my-auto px-2 max-w-4xl">
    <div class="content-center text-center flex flex-col items-center">
      <h1 class="text-white font-bold text-4xl my-5">
        {#if opponent != ""}
          {#if winner != ""}
            {#if winner == $user.name}
              You won!
            {:else}
              {winner} won! You Suck
            {/if}
          {:else if draw}
            It's a tie! You both suck!
          {:else if currentPlayer != symbol}
            {opponent}'s Turn
          {:else}
            Your Turn
          {/if}
        {:else}
          Waiting for opponent...
        {/if}
      </h1>
      <div class="my-5 w-full">
        <button class="btn" on:click={() => (revealCode = !revealCode)}>
          {#if revealCode}
            {code}
          {:else}
            Click to reveal code!
          {/if}
        </button>
        <button on:click={() => goto("/")} class="btn">Exit</button>
      </div>
    </div>
    <br />
    <Board
      currentPlayer={symbol}
      disabled={symbol != currentPlayer || opponent == ""}
      on:turn={handleTurn}
      bind:data
      gameOver={winner.toLocaleLowerCase() == "x" ||
        winner.toLocaleLowerCase() == "o" ||
        draw}
    />
    <br />
    <div class="bg-white p-4 rounded-lg ">
      <h1 class="text-2xl font-bold">Tic Tac Chat</h1>
      <div class="h-64 overflow-y-auto break-words">
        {#each chatMsgs as message}
          <p class="snap-y snap-center px-2 my-auto" class:self={message.self}>
            <strong>{message.from}:</strong>
            {message.content}
          </p>
        {:else}
          <h2 class="italic text-lg">No messages yet...</h2>
        {/each}
      </div>
      <form on:submit|preventDefault={sendMsg}>
        <input
          class="chatInput"
          bind:value={chatMsg}
          placeholder="Enter a nice message..."
        />
      </form>
    </div>
  </div>
</div>

<style lang="postcss">
  .btn {
    @apply bg-white max-w-fit p-2 rounded-lg font-bold select-none shadow-2xl inline;
    @apply hover:text-blue-500;
    @apply transition-colors ease-in-out duration-300;
  }
  .self {
    @apply bg-blue-500 bg-opacity-40;
    @apply border-l-2 border-blue-400;
  }
  .chatInput {
    @apply px-4 py-2 rounded-md shadow-xl border-black border w-full;
  }
</style>
