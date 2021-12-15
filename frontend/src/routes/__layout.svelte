<script lang="ts">
  import "../app.css";
</script>
  <div class="flex flex-col min-h-screen">
    <main class="flex-grow">
      <section class="container mx-auto max-w-6xl">
        <slot />
      </section>
    </main>
     <footer class="py-5">
      <p class="text-center font-bold italic">
        Made by Jordan
      </p>
    </footer>
  </div> 
