<script context="module">
  export async function preload(page, session) {
    try {
      const { username } = page.query

      const response = await this.fetch(`/maps.json?username=${username}`)

      const maps = await response.json()

      return { maps, user: username }
    } catch (err) {
      return { maps: [] }
    }
  }
</script>

<script>
  import { goto } from '@sapper/app'
  export let maps = []
  export let user

  let username

  const navigate = (e) => {
    e.preventDefault()
    goto(`/maps?username=${username}`)
  }
</script>

<svelte:head>
  {#if user}
    <title>Ficture | {user}'s maps</title>
    <meta property="og:title" content="Ficture" />
    <meta property="og:description" content="View {user}'s maps!" />
    <meta
      property="og:image"
      content="https://ficture.herokuapp.com/thumbnail.jpg"
    />
  {:else}
    <title>Ficture | Maps</title>
  {/if}
</svelte:head>

<div class="paper view">
  <img src="logo-512.png" alt="ficture logo" />
  <h1>Ficture</h1>
  {#if maps.length == 0}
    <p>Enter a username below to view their maps!</p>
    <form on:submit={navigate}>
      <input type="text" class="input" bind:value={username} />
      <input class="button" type="submit" value="Go" />
    </form>
  {:else}
    <table>
      <tr>
        <th>Name</th>
        <th>Creator</th>
        <th>Link</th>
      </tr>
      {#each maps as map}
        <tr>
          <td>{map.name}</td>
          <td>{map.user}</td>
          <td><a href="/maps/{map.mapId}">view</a></td>
        </tr>
      {/each}
    </table>
  {/if}
</div>

<style>
  .view {
    max-width: 1000px;
    margin: 1em auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  form {
    display: flex;
    justify-content: center;
    gap: 1em;
  }

  img {
    height: 200px;
    width: 200px;
    margin: auto;
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }
</style>
