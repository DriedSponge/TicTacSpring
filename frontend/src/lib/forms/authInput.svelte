<script lang="ts">
  export let placeholder: string;
  export let label: string;
  export let id: string;
  export let value = null;
  export let type: string = "text";

  const handleInput = e => {
    value = type.match(/^(number|range)$/)
      ? +e.target.value
      : e.target.value;
  };
</script>

<label for={id}>{label}</label>
<input name={id} {id} {placeholder} {type} {value} on:input={handleInput}/>

<style lang="postcss">
  label {
    @apply font-bold text-lg;
  }
  input {
    @apply px-3  py-2 shadow-sm rounded-lg block text-lg border w-full appearance-none;
    @apply focus:outline-none;
  }
</style>
