<script>
  import { goto } from '@sapper/app'
  import { user } from '../stores.js'
  import { onMount } from 'svelte'
  import * as tf from '@tensorflow/tfjs'
  import NavBar from '../components/NavBar.svelte'

  let model
  let modalOpen = false

  onMount(async () => {
    if (!$user.access_token || !$user.refresh_token || !$user.username) {
      let res = await fetch('/user.json')

      if (res.status === 200) {
        const sessionData = await res.json()

        res = await fetch('/auth/login.json', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: sessionData.refresh_token })
        })

        const { access_token } = await res.json()

        $user.access_token = access_token
        $user.refresh_token = sessionData.refresh_token
        $user.username = sessionData.username
      } else goto('/auth/login')
    }

    model = await tf.loadLayersModel('/model/model.json')
  })

  const logout = async () => {
    console.log('logging out')
    $user = {}
    await fetch('/auth/logout.json')
    console.log('after fetch')
    goto('/auth/login')
  }

  const generate = async () => {
    const canvas = document.querySelector('ficture-canvas')
    modalOpen = true

    // get user drawing from canvas and scale from -1 to 1
    let image = tf.browser.fromPixels(canvas.getCanvas())
    image = (await image.array()).map((row) =>
      row.map((column) => column.map((item) => (2 / 255) * item - 1))
    )

    // get input tensor and predict with model
    // scale output from 0 - 255
    const input = tf.tensor([image])
    let output = (await model.predict(input).array())[0]
    output = output.map((row) =>
      row.map((column) => column.map((item) => (255 / 2) * item + 255 / 2))
    )

    // write image to canvas
    const resultCanvas = document.querySelector('#result-canvas')
    await tf.browser.toPixels(output, resultCanvas)
  }

  const save = () => {
    const resultCanvas = document.querySelector('#result-canvas')
    const mapName = document.querySelector('#map-name')

    resultCanvas.toBlob(async (file) => {
      const formData = new FormData()

      formData.append(
        'file',
        file,
        `${mapName.value.toLowerCase().replaceAll(' ', '_')}.jpeg`
      )

      const response = await fetch('/maps.json', {
        method: 'POST',
        body: formData
      })

      const fictureCanvas = document.querySelector('ficture-canvas')

      fictureCanvas.clear()
      modalOpen = false
    }, 'image/jpeg')
  }
</script>

<svelte:head><title>Ficture | Home</title></svelte:head>
<NavBar />

<div class="paper">
  <h1>Welcome to Ficture!</h1>
  <p>Draw on the canvas below to get started.</p>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <a href="/auth/change-password">change password</a>
    <button on:click={logout}>logout</button>
    <ficture-canvas height={256} width={256} />
    {#if model}
      <button class="button" on:click={generate}>Generate World Map</button>
    {/if}
  </div>
</div>

{#if modalOpen}
  <div class="modal">
    <div class="modal-content">
      <div class="close" on:click={() => (modalOpen = false)}>&times;</div>
      <h1>Generated!</h1>
      <div class="map-controls">
        <input id="map-name" class="input" placeholder="Name your map!" />
        <canvas id="result-canvas" height="256" width="256" />
        <button class="button" on:click={save}>Save</button>
      </div>
    </div>
  </div>
{/if}

<style>
  h1,
  p {
    text-align: center;
  }

  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: white;
    margin: 20% auto;
    width: fit-content;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 #333;
  }

  .map-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .map-controls *:not(canvas) {
    margin: 10px;
    width: 100%;
  }

  .close {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    text-align: right;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  #result-canvas {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }

  ficture-canvas {
    padding: 20px;
    background-color: #999;
    border-radius: 10px;
    margin: 2em 0;
  }
</style>
