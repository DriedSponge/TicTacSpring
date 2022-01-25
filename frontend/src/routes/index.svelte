<script context="module" lang="ts">
  import {name} from "$lib/session"
  import LobbyController from "$lib/LobbyController.svelte";
  import Login from "$lib/Login.svelte";
  import axios from "axios";
  export const prerender = true;
  
</script>

<svelte:head>
  <title>Tic Tac Toe</title>
</svelte:head>

<h1 class="text-center text-5xl font-bold my-5 text-white">Tic Tac Toe!</h1>
<br />
<div class="container my-auto px-2 flex-grow">
  {#if $name.length == 0}
    <Login />
  {:else}
    <LobbyController />
  {/if}
</div>
