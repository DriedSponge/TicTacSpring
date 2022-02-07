<script lang="ts">
  export let placeholder: string;
  export let label: string;
  export let id: string;
  export let value = null;
  export let type: string = "text";
  export let error: string = "";

  const handleInput = (e) => {
    value = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;
  };
</script>

<label for={id}>{label}</label>
<input name={id} {id} {placeholder} {type} {value} on:input={handleInput} class:error={error} on:change />
{#if error}
  <p class="text-red-500">{error}</p>
{/if}

<style lang="postcss">
  label {
    @apply font-normal text-lg;
  }
  input {
    @apply px-3 py-2 shadow-sm rounded-md block text-lg border w-full appearance-none;
    @apply focus:outline-none focus:border-blue-400 border-2;
    @apply  transition ease-in-out duration-300;
  }
  input.error{
      @apply border-red-200;
  }
</style>
