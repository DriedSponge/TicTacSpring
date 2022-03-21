<script lang="ts">
  import "../app.css";
  import { SvelteToast } from "@zerodevx/svelte-toast";
</script>

<SvelteToast />

<div class="flex flex-col min-h-screen bg-green-600">
  <main class="flex-grow">
    <section class="container mx-auto max-w-6xl">
      <h1
        class="text-center md:text-5xl text-4xl font-bold my-5 text-white italic under"
      >
        Tic Tac Toe!
      </h1>
      <slot />
    </section>
  </main>
</div>
