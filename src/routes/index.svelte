<script>
  import About from '../components/About.svelte'
  import Coastlines from '../components/Coastlines.svelte'
</script>

<svelte:head>
  <title>Ficture | Home</title>
  <meta property="og:title" content="Ficture" />
  <meta property="og:description" content="Map generation using pix2pix GAN" />
  <meta
    property="og:image"
    content="https://ficture.herokuapp.com/thumbnail.jpg"
  />
</svelte:head>

<div class="content-container">
  <main class="content" style="flex: 1">
    <Coastlines />
  </main>
  <article class="content" style="flex: 2">
    <About />
  </article>
</div>

<style>
  .content-container {
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
