<script lang="ts">
  import Menubutton from "$lib/menubutton.svelte";
  import axios from "axios";
  import { onMount } from "svelte";
  import { isAuthenticated, user } from "$lib/store";
  import { createClient } from "$lib/authService";
  import AuthInput from "$lib/forms/authInput.svelte";
  import About from "./about.svelte";
</script>

<svelte:head>
  <title>Tic Tac Toe!</title>
</svelte:head>

<h1
  class="text-center md:text-5xl text-4xl font-bold my-5 text-white italic under"
>
  Tic Tac Toe!
</h1>
<br />
<div class="flex justify-center">
  <div class="container my-auto px-2 max-w-4xl">
    {#await createClient()}
      <h1 class="text-2xl text-center animate-pulse text-white font-bold">
        Loading...
      </h1>
    {:then val}
      {#if !$isAuthenticated}
        <form>
          <AuthInput
            label="Name"
            placeholder="Enter a valid name..."
            id="name"
          />
        </form>
      {:else}
        <h1 class="text-center text-white text-xl font-bold">
          Welcome back {$user.name}!
        </h1>
        <br />
        <Menubutton link="/login">Create Game</Menubutton>
        <br />
        <Menubutton link="/login">Join Game</Menubutton>
        <br />
        <Menubutton link="/login">Your Statistics</Menubutton>
        <br />
        <Menubutton link="/register">Logout</Menubutton>
      {/if}
    {/await}
  </div>
</div>
