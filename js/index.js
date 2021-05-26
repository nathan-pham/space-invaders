import canvas from "./libs/canvas.js"
import spaceship from "./components/spaceship.js"

const dimensions = {
    width: 400,
    height: 600
}

const init = (async () => {
    const app = canvas({ 
        target: "#canvas",
        dimensions,
        background: "#000000"
    })
    
    app.resize()
    app.pixelated()

    const spaceshipPath = "imgs/red-spaceship.png"
    const assets = await app.load(spaceshipPath)


    const player = spaceship(assets[spaceshipPath], dimensions)

    // app.ctx.fillStye =
    // app.ctx.fillStyle = "#000"
    // app.ctx.fillRect(0, 0, 100, 100)

    app.add(player)
    app.start()
    // const spaceship = assets[spaceshipPath]

    // canvas.
//     ctx.drawImage(files["spritesheet.png"],
//     blocks[i].sx, blocks[i].sy, 17, 17,
//     x, y, 50, 50
//   )
})()
