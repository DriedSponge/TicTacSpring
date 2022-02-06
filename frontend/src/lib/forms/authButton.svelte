<script lang="ts">
  export let type = null;
</script>

<button {type}><slot /></button>

<style lang="postcss">
  button {
    @apply py-2 mt-3 appearance-none rounded-lg  shadow-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg md:text-xl;
    @apply transition ease-in-out duration-300 w-full;
  }
</style>
