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
    app.pixelated()
    app.resize()

    const spaceshipPath = "imgs/red-spaceship.png"
    const alienPath = "imgs/yellow-alien.png"
    const bulletPath = "imgs/bullet.png"

    const assets = await app.load(spaceshipPath, alienPath, bulletPath)

    app.add(spaceship(assets[spaceshipPath], assets[bulletPath]))
    app.add(alien(assets[alienPath]))
    app.add(alien(assets[alienPath]))
    app.add(alien(assets[alienPath]))

    app.add(starfield(100))
    app.start()
})()
