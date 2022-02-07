<script>
import Menubutton from "$lib/menubutton.svelte";




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
    <Menubutton link="/login">Login</Menubutton>
    <br>
    <Menubutton link="/register">Register</Menubutton>
  </div>
</div>
