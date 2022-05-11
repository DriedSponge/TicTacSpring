<script lang="ts">
  import { getStores, navigating, page, session, updated } from "$app/stores";
  import Board from "$lib/Board.svelte";
  import { goto } from "$app/navigation";
  import { io } from "socket.io-client";
  import { onMount, onDestroy } from "svelte";
  let chatMsg: string = "";

  let revealCode: boolean = false;
  const socket = io("http://localhost:8080/", { withCredentials: true });

  socket.on("gameEvent", (data) => console.log(data));
  socket.on("chatEvent", (data) => console.log(data));
  socket.emit("joinGame", { gameId: 1111 });
  onMount(async () => {});
  onDestroy(async ()=>{
    socket.close();
  })
  function sendMsg() {
    socket.emit("chatMessage", { content: chatMsg, gameId: 1111 });
    chatMsg = "";
    console.log("Sending " + chatMsg);
  }
</script>

<div class="flex justify-center">
  <div class="container my-auto px-2 max-w-4xl">
    <div class="content-center text-center flex flex-col items-center">
      <h1 class="text-white font-bold text-4xl my-5 animate-pulse">
        Waiting for opponent...
      </h1>
      <div class="my-5 w-full">
        <button class="btn" on:click={() => (revealCode = !revealCode)}>
          {#if revealCode}
            {$page.params.gameId}
          {:else}
            Click to reveal code!
          {/if}
        </button>
        <button on:click={() => goto("/")} class="btn">Exit</button>
      </div>
    </div>
    <Board />
    <br />
    <form on:submit|preventDefault={sendMsg}>
      <input bind:value={chatMsg} placeholder="Enter a nice message..." />
      <button type="submit">Send</button>
    </form>
  </div>
</div>

<style lang="postcss">
  .btn {
    @apply bg-white max-w-fit p-2 rounded-lg font-bold select-none shadow-2xl inline;
    @apply hover:text-blue-500;
    @apply transition-colors ease-in-out duration-300;
  }
</style>
