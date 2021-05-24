<div class="paper">
  <h1>About Ficture</h1>
  <p>
    Ficture is made up of 4 pieces: the <a
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
    >. Ficture attempts to allow users to generate detailed terrain maps given a
    simple coastline drawing. It also allows them to save, share, and view their
    generated maps.
  </p>
  <h2>Dataset Generation</h2>
  <figure>
    <img src="dataset_example.png" alt="Dataset example" />
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
    <img src="canvas_controls.jpg" alt="Canvas with controls" />
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
    Authentication is provided by
    <a href="https://aws.amazon.com/cognito/" target="_blank">Amazon Cognito</a
    >, and the app is hosted on
    <a href="https://www.heroku.com/" target="_blank">Heroku</a>. The main
    feature of the app is showcased on the right with the usage of the
    <code>ficture-canvas</code> web component that I introduced earlier. For this
    purpose, I don't need the user to draw in color, so the controls are disabled.
  </p>
  <h2>Results</h2>
  <p>
    Overall, I think that this project allowed me to try out a lot of technology
    that I haven't used before. While the result of the neural network is not as
    satisfying as I could have hoped, I think that this project is a good
    showcase for the technology. One of the main problems that I think could be
    solved is the way that the dataset generation generates the coastline
    outlines. The amount of detail that the network is trained on is quite
    different from what a user would actually draw. I've also considered that a
    pix2pix GAN might not be the best neural network to solve this problem, but
    I'm still happy with the details that it <em>was</em> able to extract from the
    training data.
  </p>
</div>

<style>
  p {
    margin: 1em 2em;
    line-height: 1.6;
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
    width: 400px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  }

  @media only screen and (max-width: 600px) {
    p {
      margin: 0.5em;
    }

    figure img {
      width: 100%;
    }
  }
</style>
