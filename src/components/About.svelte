<div class="paper">
  <h1>About Ficture</h1>
  <p>
    Ficture is made up of 4 seperate peices: the <a
      href="https://github.com/mengistristen/ficture-terraingen"
      target="_blank">dataset generation</a
    >, the
    <a href="https://github.com/mengistristen/ficture-model" target="_blank"
      >neural network</a
    >, the
    <a href="https://github.com/mengistristen/ficture-canvas" target="_blank"
      >canvas web component</a
    >, and the
    <a href="https://github.com/mengistristen/ficture" target="_blank"
      >web application</a
    >. Ficture, using a pix2pix GAN, attempts to allow users to generate
    detailed terrain maps given a simple coastline drawing.
  </p>
  <h2>Dataset Generation</h2>
  <figure>
    <img src="dataset_example.png" alt="Dataset example" style="width: 400px" />
    <figcaption><strong>Figure 1</strong> - dataset example image</figcaption>
  </figure>
  <p>
    The dataset generator takes the form of a command line tool. Using <a
      href="https://www.npmjs.com/package/simplex-noise"
      target="_blank">simplex noise</a
    >, the tool generates a map similar to the one above in Figure 1. It then
    extracts the coastlines from that image and combines the two to make an
    image that is recognizable by the neural network. For this project, I used a
    dataset of 3000 training images and 500 test images.
  </p>
  <h2>Neural Network</h2>
  <p>
    The neural network that I used is a Generative Adverserial Network (GAN),
    specifically a pix2pix GAN. The pix2pix GAN that I used is a modified
    version of the one found in <a
      href="https://github.com/eriklindernoren/Keras-GAN"
      target="_blank">this</a
    > repository. It uses a U-Net generator and a PatchGAN descriminator. On 2 GTX
    980s, the model took about 4 days to train.
  </p>
  <h2>Web Component</h2>
  <figure>
    <img
      src="canvas_controls.jpg"
      alt="Canvas with controls"
      style="width: 300px"
    />
    <figcaption>
      <strong>Figure 2</strong> - canvas web component with controls enabled
    </figcaption>
  </figure>
  <p>
    The canvas is a component made using the <a
      href="https://developer.mozilla.org/en-US/docs/Web/Web_Components"
      target="_blank">Web Components API</a
    >. It wasn't actually used in Ficture, but the web component allows you to
    add controls for the color the color and brush size. Both of those can also
    be controlled programmatically. The canvas can be easily added to a project
    by importing FictureCanvas.js and adding the <code>ficture-canvas</code> tag
    to your HTML.
  </p>
  <h2>Web App</h2>
  <p>
    The web application is built using <a
      href="https://svelte.dev"
      target="_blank">Svelte</a
    >
    with <a href="https://sapper.svelte.dev" target="_blank">Sapper</a>. The
    neural network is loaded and run using
    <a href="https://www.tensorflow.org/js" target="_blank">TensorFlow.js</a>.
  </p>
</div>

<style>
  p {
    margin: 1em 2em;
  }

  a {
    color: #4daa57;
    text-decoration: none;
  }

  a:is(:hover, :focus) {
    text-decoration: underline;
  }

  figure {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  figure img {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  }
</style>
