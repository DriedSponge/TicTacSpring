<script context="module" lang="ts">
  import Login from "$lib/Login.svelte";
  export const prerender = true;

  
</script>

<svelte:head>
  <title>Tic Tac Toe</title>
</svelte:head>

<h1 class="text-center text-5xl font-bold my-5 text-white">Tic Tac Toe!</h1>
<br />
<div class="container my-auto px-2 flex-grow">
  <Login />
</div>


