  
  <form autocomplete="off">
    <div class="flex flex-col">
      <div class="w-full">
        <input
          name="name"
          id="name"
          maxlength="30"
          placeholder="Your Name"
        />
      </div>
      <div class="w-full">
        <button type="submit">Go</button>
      </div>
    </div>
  </form>
  
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