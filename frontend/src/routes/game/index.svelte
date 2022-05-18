<script lang="ts">
  import { getStores, navigating, page, session, updated } from "$app/stores";
  import Board from "$lib/Board.svelte";
  import { goto } from "$app/navigation";
  import { io } from "socket.io-client";
  import { onMount, onDestroy } from "svelte";
  import { object, string } from "yup";
  import { toast } from "@zerodevx/svelte-toast";

  let chatMsg: string = "";
  let opponent: string = "";
  let code: string = "";
  interface ChatMessage {
    from: string;
    content: string;
    self?: boolean;
  }
  let chatMsgs: ChatMessage[] = [];
  let revealCode: boolean = false;

  const socket = io("http://localhost:8080/", { withCredentials: true });

  socket.on("playerJoin", (data) => {
    opponent = data.player;
  });

  socket.on("chatEvent", (data) => {
    console.log("Received Chat Message From " + data.from);
    chatMsgs = [...chatMsgs, { from: data.from, content: data.content }];
    console.log(chatMsgs);
  });

  onMount(async () => {
    code = window.localStorage.getItem("code");
    socket.emit("joinGame", { gameId: code });
  });
  onDestroy(async () => {
    socket.close();
  });
  function sendMsg() {
    socket.emit("chatMessage", { content: chatMsg, gameId: code });
    chatMsgs = [...chatMsgs, { from: "You", content: chatMsg, self: true }];
    console.log("Sending " + chatMsg);
    chatMsg = "";
  }
</script>

<div class="flex justify-center">
  <div class="container my-auto px-2 max-w-4xl">
    <div class="content-center text-center flex flex-col items-center">
      {#if opponent != ""}
        <h1 class="text-white font-bold text-4xl my-5">
          Playing Agaist {opponent}
        </h1>
      {:else}
        <h1 class="text-white font-bold text-4xl my-5 animate-pulse">
          Waiting for opponent...
        </h1>
      {/if}
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
