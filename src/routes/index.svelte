<script>
  import About from '../components/About.svelte'
  import Coastlines from '../components/Coastlines.svelte'
</script>

<svelte:head><title>Ficture | Home</title></svelte:head>

<div class="container">
  <main class="content">
    <Coastlines />
  </main>
  <article class="content">
    <About />
  </article>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    max-width: 1500px;
    margin: 1em auto;
    padding: 0 2em;
    gap: 2em;
  }

  .content {
    flex-basis: calc(calc(700px - 100%) * 99999);
    flex-grow: 1;
  }
</style>
