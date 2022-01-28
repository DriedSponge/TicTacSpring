<script context="module" lang="ts">
  import { name } from "$lib/session";
  import LobbyController from "$lib/LobbyController.svelte";
  import Login from "$lib/Login.svelte";
  import axios from "axios";
  export const prerender = false;
  if (typeof localStorage !== 'undefined' && localStorage.getItem("token")) {
    axios
      .get("http://localhost:8080/v1/player/me", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        name.set(res.data.name);
      })
      .catch((error) => {
        localStorage.removeItem("token");
      });
  }
</script>

<svelte:head>
  <title>Tic Tac Toe!</title>
</svelte:head>

<h1 class="text-center md:text-5xl text-4xl font-bold my-5 text-white italic under">Tic Tac Toe!</h1>
<br />
<div class="container my-auto px-2 flex-grow">
  {#if $name.length == 0}
    <Login />
  {:else}
    <LobbyController />
  {/if}
</div>
