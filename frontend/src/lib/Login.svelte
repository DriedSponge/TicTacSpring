<script lang="ts">
  import { name as n } from "$lib/session";
  import axios from "axios";
  export const prerender = true;
  let name: string = "";
  let error: string = "";
</script>


  <div class="w-full">
    <button type="submit">Login</button>
  </div>
  


<style lang="postcss">
  button {
    @apply py-2 appearance-none rounded-lg  shadow-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl;
    @apply transition ease-in-out duration-300 w-full;
  }
</style>
