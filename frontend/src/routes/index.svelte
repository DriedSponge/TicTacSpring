<script lang="ts">
  import Menubutton from "$lib/menubutton.svelte";
  import { isAuthenticated, user } from "$lib/store";
  import { createClient, logout } from "$lib/authService";
  import Login from "$lib/Login.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import Loading from "$lib/Loading.svelte";
  import axios from "axios";
  import { goto } from "$app/navigation";
  import AuthButton from "$lib/forms/authButton.svelte";
  import Join from "./join.svelte";
  import { io } from "socket.io-client";

  function createGame() {
    const socket = io("http://localhost:8080/", { withCredentials: true });
    socket.emit("createGame", {}, (response) => {
      $user.gameId = response;
      window.localStorage.setItem("gameId",response)
      goto("/game");
    });
  }
  function joinGame() {
    goto("/join");
  }
</script>

<svelte:head>
  <title>Tic Tac Toe!</title>
</svelte:head>

<br />
<div class="flex justify-center">
  <div class="container my-auto px-2 max-w-4xl">
    {#await createClient()}
      <Loading>Loading...</Loading>
    {:then val}
      {#if !$isAuthenticated}
        <Login />
      {:else}
        <h1
          class="text-center text-white text-xl md:text-2xl lg:text-3xl font-bold"
        >
          Welcome {$user.name}!
        </h1>
        <br />
        <Menubutton on:click={createGame}>Create Game</Menubutton>
        <br />
        <Menubutton on:click={joinGame}>Join Game</Menubutton>
        <br />
        <Menubutton on:click={logout}>Change Name</Menubutton>
      {/if}
    {/await}
    <br />
    <div class="text-center">
      <a class="singleplayer" sveltekit:prefetch href="/game/single-player"
        >Play Single Player</a
      >
    </div>
  </div>
</div>

<style lang="postcss">
  .singleplayer {
    @apply bg-blue-500 text-white appearance-none font-bold px-4 py-2 rounded-md text-center shadow-lg;
    @apply hover:bg-blue-600;
    @apply transition ease-in-out duration-300;
  }
</style>
