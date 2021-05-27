import config from "./config.js"
import canvas from "./libs/canvas.js"
import alien from "./components/alien.js"
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
    const alienPath = "imgs/yellow-alien.png"

    const assets = await app.load(spaceshipPath, alienPath)

    app.add(spaceship(assets[spaceshipPath], dimensions))
    app.add(alien(assets[alienPath], dimensions))
    app.add(starfield(100))
    app.start()
})()
