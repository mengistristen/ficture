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
    $user = {}
    await fetch('/auth/logout.json')
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
</script>

<svelte:head><title>Ficture | Home</title></svelte:head>
<NavBar />

<div class="paper">
  <h1>Welcome to Ficture!</h1>
  <p>Draw on the canvas to get started.</p>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <a href="/auth/change-password">change password</a>
    <button on:click={logout}>logout</button>
    <ficture-canvas style="margin-top: 2em;" height={256} width={256} />
    {#if model}
      <button class="button" on:click={generate}>Generate!</button>
    {/if}
  </div>
</div>

{#if modalOpen}
  <div class="modal">
    <div class="modal-content">
      <span class="close" on:click={() => (modalOpen = false)}>&times;</span>
      <input placeholder="Name" />
      <canvas id="result-canvas" height="256" width="256" />
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
    margin: 15% auto;
    padding: 20px;
    width: 80%;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 #333;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
</style>
