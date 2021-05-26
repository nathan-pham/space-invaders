import app from "./libs/app.js"
import { load as loadAssets } from "./libs/assets.js"

const canvas  = app({ 
    target: "#canvas",
    dimensions: {
        width: 400,
        height: 600
    },
    background: "#000"
})

canvas.resize()
canvas.pixelated()