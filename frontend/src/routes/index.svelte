<script lang="ts">
  import Menubutton from "$lib/menubutton.svelte";
  import { isAuthenticated, user } from "$lib/store";
  import { createClient, logout } from "$lib/authService";
  import Login from "$lib/Login.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import Loading from "$lib/Loading.svelte";
  import axios from "axios";
  import { goto } from "$app/navigation";

  function createGame() {
    axios
      .post("http://localhost:8080/game/create", {}, { withCredentials: true })
      .then((res) => {
        user.gameId = res.data.gameId;
        goto("/game/" + res.data.gameId);
      });
  }
</script>

<SvelteToast />
<svelte:head>
  <title>Tic Tac Toe!</title>
</svelte:head>


<br />
<div class="flex justify-center">
  <div class="container my-auto px-2 max-w-4xl">
    {#await createClient()}
      <Loading />
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
        <Menubutton link="/login">Join Game</Menubutton>
        <br />
        <Menubutton on:click={logout}>Change Name</Menubutton>
      {/if}
    {/await}
  </div>
</div>
