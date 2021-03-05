<script context="module">
  export async function preload(page, session) {
    try {
      const { id } = page.params

      const response = await this.fetch(`/maps/${id}.json`)

      const map = await response.json()

      return { map }
    } catch (err) {
      return { map: {} }
    }
  }
</script>

<script>
  import { user } from '../../stores'
  export let map = {}
</script>

<div class="paper">
  <img src="logo-512.png" alt="ficture logo" />
  <h1>Ficture</h1>
  {#if Object.keys(map).length === 0}
    <p>Specified map not found</p>
  {:else}
    <h2>{map.name}</h2>
    <p>by {map.user}</p>
    <img class="map-image" src={map.location} alt="{map.user}'s map" />
  {/if}
</div>
{#if $user.access_token}
  <button>delete</button>
{/if}

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  img {
    height: 200px;
    width: 200px;
    margin: auto;
  }

  p {
    margin-top: 0;
  }

  .map-image {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
</style>
