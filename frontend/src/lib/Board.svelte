<script lang="ts">
  let data: any = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
</script>

<div class="grid grid-cols-3 justify-items-center  bg-white">
  {#each data as tile}
    <button class="tttbtn" on:click="{(()=>{tile="X"; console.log(data)})}">
      {tile}
    </button>
  {/each}
</div>
<style lang="postcss">
    .tttbtn{
        @apply transition hover:bg-gray-300;
        @apply text-4xl border-black border md:text-5xl bg-white  px-3 py-2 w-full font-bold;
    }
</style>