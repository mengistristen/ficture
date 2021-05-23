<script>
  import { goto } from '@sapper/app'
  import { user } from '../stores.js'
  import { onMount } from 'svelte'
  import * as tf from '@tensorflow/tfjs'

  let model
  let modalOpen = false
  let mapName = ''
  let exampleImage = ''

  onMount(async () => {
    model = await tf.loadLayersModel('/model/model.json')
  })

  const generate = async () => {
    const canvas = document.querySelector('ficture-canvas').getCanvas()
    const ctx = canvas.getContext('2d')
    modalOpen = true

    //  grab user drawing
    const tempImage = new Image()
    tempImage.src = canvas.toDataURL()

    tempImage.onload = async () => {
      //  create image with white background and user drawing
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, 256, 256)
      ctx.drawImage(tempImage, 0, 0)

      // scale modified drawing from -1 to 1
      let image = tf.browser.fromPixels(canvas, 3)
      console.log({ image: await image.array() })
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
  }

  const save = () => {
    const resultCanvas = document.querySelector('#result-canvas')

    resultCanvas.toBlob(async (file) => {
      const formData = new FormData()

      formData.append(
        'file',
        file,
        `${mapName.toLowerCase().replaceAll(' ', '_')}.jpeg`
      )

      formData.append('username', $user.username)
      formData.append('name', mapName)

      await fetch('/maps.json', {
        method: 'POST',
        body: formData
      })

      closeModal()
    }, 'image/jpeg')
  }

  const closeModal = () => {
    modalOpen = false
    mapName = ''

    document.querySelector('ficture-canvas').clear()
    clearExample()
  }

  const loadExample = () => {
    const background = document.querySelector('#bottom')
    const imageNum = Math.floor(Math.random() * 5 + 1)

    exampleImage = `example_${imageNum}.jpg`
    background.style.background = `url(${exampleImage})`
    background.style.backgroundSize = 'contain'
    background.style.opacity = 0.6
  }

  const clearExample = () => {
    const background = document.querySelector('#bottom')

    exampleImage = ''
    background.style.background = 'white'
    background.style.backgroundSize = 'initial'
    background.style.opacity = 1

    document.querySelector('ficture-canvas').clear()
  }
</script>

<div class="paper">
  <p>Draw on the canvas below to get started.</p>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div>
      <p>Need Help?</p>
      <button class="button" on:click={loadExample}>Load Example</button>
      <button class="button-secondary" on:click={clearExample}>Clear</button>
    </div>
    <div class="canvas-container">
      <div id="bottom" />
      <ficture-canvas id="top" height="256" width="256" />
    </div>
    {#if model}
      <button class="button" on:click={generate}>Generate World Map</button>
    {/if}
  </div>
</div>

{#if modalOpen}
  <div class="modal">
    <div class="modal-content">
      <div class="close" on:click={closeModal}>&times;</div>
      <h1>Generated!</h1>
      <div class="map-controls">
        <input
          class="input"
          placeholder="Name your map!"
          bind:value={mapName}
        />
        <div id="comparison">
          {#if exampleImage}
            <img
              src={exampleImage}
              height="256px"
              width="256px"
              alt="comparison"
              style="box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);"
            />
          {/if}
          <canvas id="result-canvas" height="256" width="256" />
        </div>
        {#if mapName && $user.access_token}
          <button class="button" on:click={save}>Save</button>
        {:else}
          <button class="button" disabled>Save</button>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  h1,
  p {
    text-align: center;
  }

  .paper {
    position: sticky;
    top: 1em;
    width: fit-content;
    margin: 0 auto;
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
    z-index: 3;
  }

  .modal-content {
    background-color: white;
    margin: 5em auto;
    width: fit-content;
    padding: 20px;
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

  .canvas-container {
    padding: 20px;
    background-color: #999;
    border-radius: 10px;
    margin: 2em 0;
    position: relative;
  }

  #top {
    position: relative;
    z-index: 2;
    left: 0;
    height: 256px;
    width: 256px;
  }

  #bottom {
    position: absolute;
    z-index: 1;
    left: 20px;
    height: 256px;
    width: 256px;
    background: white;
  }

  #comparison {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #comparison > * {
    height: 256px;
    width: 256px;
  }
</style>
