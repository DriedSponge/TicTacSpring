<script lang="ts">
  import Menubutton from "$lib/menubutton.svelte";
  import { isAuthenticated, user } from "$lib/store";
  import { createClient, logout } from "$lib/authService";
  import Login from "$lib/Login.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import Loading from "$lib/Loading.svelte";
  import axios from "axios";
  import { goto } from "$app/navigation";
  import { io } from "socket.io-client";
import { onDestroy } from "svelte";
  let gameId: string = "";
  const socket = io("http://localhost:8080/", { withCredentials: true });

  function joinGame() {
    window.localStorage.setItem("gameId",gameId);
    $user.gameId = gameId;
    goto("/game");
  }
  onDestroy(async () => {
    socket.close();
  });
</script>

<svelte:head>
  <title>Tic Tac Toe! - Join Game</title>
</svelte:head>

<br />
<div class="flex justify-center">
  <div class="container my-auto px-2 max-w-4xl">
    {#await createClient()}
      <Loading>Loading...</Loading>
    {:then val}
      {#if !$isAuthenticated}
        {goto("/")}
      {:else}
        <form autocomplete="off" on:submit|preventDefault={joinGame}>
          <div class="flex flex-col">
            <div class="w-full">
              <input
                bind:value={gameId}
                name="code"
                id="code"
                maxlength="6"
                placeholder="Game Code"
              />
            </div>
            <div class="w-full">
              <button type="submit">Join</button>
            </div>
          </div>
        </form>
      {/if}
    {/await}
  </div>
</div>

<style lang="postcss">
  button {
    @apply py-2 appearance-none rounded-b-lg border-t-0 rounded-t-none shadow-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl;
    @apply transition ease-in-out duration-300 w-full;
  }
  input {
    @apply p-2;
    @apply appearance-none;
    @apply focus:ring-0 focus:outline-none;
    @apply transition duration-300 ease-in-out;
    @apply w-full rounded-t-lg rounded-b-none border-gray-100 border-2 focus:border-blue-200;
    @apply placeholder:text-xl placeholder:text-center;
    @apply text-center font-bold text-xl;
  }
</style>
