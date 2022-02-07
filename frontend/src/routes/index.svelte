<script lang="ts">
import Menubutton from "$lib/menubutton.svelte";
import axios from "axios";
import { onMount } from "svelte";

let authenticated:boolean = false
let username:string = "";
onMount(()=>{
  axios.get("http://localhost:8080/auth/profile",{withCredentials: true}).then(res=>{
    console.log(res)
    authenticated = true
    username = res.data.name
  })
})

export const prerender = false;
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
      {#if !authenticated}
      <Menubutton link="/login">Login</Menubutton>
      <br>
      <Menubutton link="/register">Register</Menubutton>
      {:else}
      <h1 class="text-center text-white text-xl font-bold">Welcome back {username}!</h1>
      <br>
      <Menubutton link="/login">Create Game</Menubutton>
      <br>
      <Menubutton link="/login">Join Game</Menubutton>
      <br>
      <Menubutton link="/login">Your Statistics</Menubutton>
      <br>
      <Menubutton link="/register">Logout</Menubutton>
      {/if}
  </div>
</div>
