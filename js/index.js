import config from "./config.js"
import canvas from "./libs/canvas.js"
import starfield from "./components/starfield.js"
import spaceship from "./components/spaceship.js"

const dimensions = {
    width: 300,
    height: 500
}

const init = (async () => {
    const app = canvas(config)
    app.resize()
    app.pixelated()

    const spaceshipPath = "imgs/red-spaceship.png"
    const assets = await app.load(spaceshipPath)

    app.add(spaceship(assets[spaceshipPath], dimensions))
    app.add(starfield(100))
    app.start()
})()
