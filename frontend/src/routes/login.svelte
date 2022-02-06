<script lang="ts">
import AuthButton from "$lib/forms/authButton.svelte";
import AuthInput from "$lib/forms/authInput.svelte";

let email : string;
let password : string;

function login(e){
    console.log(email);
    console.log(password);
}

export const prerender = true;
</script>

<div class="flex items-center justify-center h-screen">
  <div class="bg-white px-10 py-5 rounded-xl flex-1 mx-4 max-w-2xl shadow-2xl">
    <h1 class="mb-4 text-center font-bold text-2xl md:text-3xl">Login</h1>
    <hr />
    <form class="my-3" on:submit|preventDefault="{login}">
      <div class="mt-2">
        <AuthInput label="Email" id="email" placeholder="email@example.com" bind:value={email} />
      </div>
      <br />
      <div class="mb-2">
        <AuthInput label="Password" id="password" placeholder="Enter your password..." type="password" bind:value={password} />
      </div>
      <AuthButton type="submit">Login</AuthButton>
    </form>
    <br />
    <p class="text-sm text-center">
      <a href="https://driedsponge.net">Forgot password</a> &bull; Don't have an
      account? <a href="/register">Sign up here!</a>
    </p>
  </div>
</div>

<style lang="postcss">
  a {
    @apply text-blue-400 hover:text-blue-600;
  }
</style>
