<p align='center'>
  <img src='https://user-images.githubusercontent.com/46630958/106235780-3e29d780-61b0-11eb-9e22-66d4a6d8f7a3.png' height=200 width=200 />
</p>

# Ficture

Ficture is a web application that allows users to turn their simple world map ideas into detailed world maps. Using neural networks, a detailed world map image is generated from a simple coastline drawing. Ficture allows users to expirement with the world map generator and save / load world maps if they choose. 

The project is split into several repositories:

[ficture][ficture]: The sapper web server, the main interface to the application

[terraingen][dataset]: The command line tool used to generate the dataset for the neural network

[model][model]: The code to train the neural network, a pix2pix GAN

[canvas][canvas]: A WebComponent for the canvas used on the main site

### Technology
- Svelte / Sapper
- Tensorflow / Tensorflow.js
- WebComponent API
- Amazon S3 / Cognito
- MongoDB

[ficture]: https://github.com/mengistristen/ficture
[dataset]: https://github.com/mengistristen/ficture-terraingen
[model]: https://github.com/mengistristen/ficture-model
[canvas]: https://github.com/mengistristen/ficture-canvas
