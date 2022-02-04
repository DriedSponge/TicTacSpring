<script>
  import { onMount } from "svelte";
  import auth from "$lib/authService";
  import { isAuthenticated, user, tasks } from "$lib/store";
  import Login from "$lib/Login.svelte";

  let auth0Client;

  // onMount(async () => {
  //   auth0Client = await auth.createClient();
  //   isAuthenticated.set(await auth0Client.isAuthenticated());
  //   user.set(await auth0Client.getUser());
  // });

  async function createclient(){
    auth0Client = await auth.createClient();
    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
  }
  function login() {
    auth.loginWithPopup(auth0Client);
  }

  function logout() {
    auth.logout(auth0Client);
  }
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
<div class="container my-auto px-2 flex-grow">
  {#await createclient()}
    <p>Fetching authentication state...</p>
  {:then val}
    {#if !$isAuthenticated}
      <Login bind:auth0Client={auth0Client} />
    {:else}
      <h1 class="text-center text-white text-xl font-bold">Welcome back {$user.name}!</h1>
    {/if}
  {/await}
</div>
