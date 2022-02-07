<script lang="ts">
  export let type = null;
  export let disabled: boolean = false;
</script>

<button {type} disabled={disabled}><slot /></button>

<style lang="postcss">
  button {
    @apply py-2 mt-3 appearance-none rounded-lg  shadow-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg md:text-xl;
    @apply transition ease-in-out duration-300 w-full;
    @apply disabled:bg-gray-500 disabled:hover:bg-gray-500
  }
</style>
