<script lang="ts">
  import Menubutton from "$lib/menubutton.svelte";
  import { isAuthenticated, user } from "$lib/store";
  import { createClient } from "$lib/authService";
  import Login from "$lib/Login.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
import Loading from "$lib/Loading.svelte";
</script>

<SvelteToast />
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
      <Loading />
    {:then val}
      {#if !$isAuthenticated}
        <Login />
      {:else}
        <h1 class="text-center text-white text-xl md:text-2xl lg:text-3xl font-bold">
          Welcome {$user.name}!
        </h1>
        <br />
        <Menubutton link="/login">Create Game</Menubutton>
        <br />
        <Menubutton link="/login">Join Game</Menubutton>
      {/if}
    {/await}
  </div>
</div>
