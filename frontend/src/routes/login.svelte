<script lang="ts">
  export const prerender = true;
</script>

<div class="flex items-center justify-center h-screen">
    <div class="bg-white px-10 py-5 rounded-xl flex-1 mx-4 max-w-2xl">
        <h1 class="mb-4 text-center font-bold text-2xl md:text-3xl">Login</h1>
        <hr>
        <form class="my-3">
            <div class="mt-2">
                <label for="email">Email</label>
                <input name="email" id="email"placeholder="email@example.com"/>
            </div>
            <br>
            <div class="mb-2">
                <label for="password">Password</label>
                <input name="password" id="password" type="password" placeholder="Enter your password..."/>
            </div>
            <button type="submit">Login</button>
        </form>
        <br>
        <p class="text-sm text-center text-blue-400 hover:text-blue-600"><a href="https://driedsponge.net">Forgot password</a></p>
    </div>
</div>

<style lang="postcss">
  button {
    @apply py-2 mt-3 appearance-none rounded-lg  shadow-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg md:text-xl;
    @apply transition ease-in-out duration-300 w-full;
  }
  label{
      @apply font-bold text-lg
  }
  input{
      @apply px-3  py-2 shadow-sm rounded-lg block text-lg border w-full appearance-none;
      @apply focus:outline-none 
  }
</style>
