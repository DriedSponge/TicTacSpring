<script lang="ts">
  import {name} from "$lib/session"
</script>
<div>
    <h1 class="text-4xl font-bold text-center text-white">
      Welcome back {$name}!
    </h1>
    <br>
    <div class="my-3">
      <button class="alone-button">Create Lobby</button>
    </div>
    <h2 class="text-center text-white text-3xl font-bold">Or...</h2>
    <div class="my-3">
      <form autocomplete="off">
        <div class="flex flex-col">
          <div class="w-full">
            <input
              name="id"
              id="id"
              maxlength="30"
              placeholder="Lobby ID"
            />
          </div>
          <div class="w-full">
            <button type="submit" class="form-button">Connect</button>
          </div>
        </div>
      </form>
    </div>
</div>
<style lang="postcss">
  
  button {
    @apply py-2 appearance-none bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl;
    @apply transition ease-in-out duration-300 w-full;
  }
  button.form-button[type="submit"]{
    @apply rounded-b-lg border-t-0 rounded-t-none shadow-lg
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
  button.alone-button{
    @apply rounded-lg;
  }
</style>
