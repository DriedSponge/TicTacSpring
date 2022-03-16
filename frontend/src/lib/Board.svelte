<script lang="ts">
  let data: any = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
</script>

<div class="grid grid-cols-3 justify-items-center gap-2">
  {#each data as tile}
    <button class="tttbtn" on:click="{(()=>{tile="X"; console.log(data)})}">
      {tile}
    </button>
  {/each}
</div>
<style lang="postcss">
    .tttbtn{
        @apply transition hover:shadow-2xl;
        @apply text-5xl bg-white rounded-xl px-3 py-2 m-4 w-full font-bold;
    }
</style>