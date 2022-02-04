<script lang="ts">
  export const prerender = true;
  export let auth0Client;
  import auth from "$lib/authService";
  function login(){
    auth.loginWithPopup(auth0Client)
  }
</script>


  <div class="w-full">
    <button type="submit" on:click={login}>Login</button>
  </div>
  


<style lang="postcss">
  button {
    @apply py-2 appearance-none rounded-lg  shadow-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl;
    @apply transition ease-in-out duration-300 w-full;
  }
</style>
