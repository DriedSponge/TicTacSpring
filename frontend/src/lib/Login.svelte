<script lang="ts">
  import { name as n } from "$lib/session";
  import axios from "axios";
  export const prerender = true;
  let name: string = "";
  let error: string = "";
  function login(e) {
    console.log(name);
    error=""
    if (name.length > 0) {
      axios
        .post("http://localhost:8080/v1/player/login", {
          name: name,
        })
        .then((res) => {
          console.log(res.data.token);
          window.localStorage.setItem("token", res.data.token);
          n.set(res.data.name);
        });
    } else {
      error = "Your name is invalid!"
      console.log("Invalid name");
    }
  }
</script>

<form on:submit|preventDefault={login} autocomplete="off">
  <div class="flex flex-col">
    <div class="w-full">
      <input
        name="name"
        id="name"
        maxlength="30"
        bind:value={name}
        placeholder="Your Name"
      />
    </div>
    <div class="w-full">
      <button type="submit">Go</button>
    </div>
  </div>
</form>
{#if error.length >0}
<div class="container bg-white py-3 my-3 rounded-lg shadow-md">
  <div class="text-red-500 text-center font-bold text-lg">
    An error has occured: {error}
  </div>
</div>
  
{/if}

<style lang="postcss">
  button {
    @apply py-2 appearance-none rounded-b-lg border-t-0 rounded-t-none shadow-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl;
    @apply transition ease-in-out duration-300 w-full;
  }
  input {
    @apply p-2;
    @apply appearance-none;
    @apply focus:ring-0 focus:outline-none;
    @apply transition duration-300 ease-in-out;
    @apply w-full rounded-t-lg rounded-b-none border-gray-100 border-2 focus:border-blue-200;
    @apply placeholder:text-xl placeholder:text-center;
    @apply text-center font-bold text-xl;
  }
</style>
