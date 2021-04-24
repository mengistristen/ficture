window.loadImage = () => {
  const canvas = document.querySelector('ficture-canvas').getCanvas()
  const input = document.createElement('input')
  const ctx = canvas.getContext('2d')

  input.type = 'file'
  input.accept = 'image/png'

  input.onchange = (e) => {
    e.preventDefault()

    const file = input.files[0]
    const reader = new FileReader()
    const image = new Image()

    reader.onload = () => {
      console.log(reader.result)
      image.src = reader.result

      image.onload = () => ctx.drawImage(image, 0, 0, 256, 256)
    }

    reader.readAsDataURL(file)
  }

  input.click()
}
