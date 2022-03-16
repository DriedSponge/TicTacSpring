<script lang="ts">
export let link: string;
</script>
<a href="{link}" on:click|preventDefault><slot/></a>
<style lang="postcss">
    a{
        @apply block font-bold text-blue-500 text-2xl bg-white rounded-lg my-2 text-center p-5 shadow-md;
        @apply transition ease-out duration-300;
        @apply hover:shadow-2xl hover:bg-gray-100 hover:text-blue-600 hover:cursor-pointer
    }
</style>