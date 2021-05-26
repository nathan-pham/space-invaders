import animate from "./animate.js"
import { load } from "./assets.js"

const defaultConfig = {
    dimensions: {
        width: 600,
        height: 480
    },
    background: "#000000"
}

const canvas = ({ target, dimensions, background }) => {
    const element = document.querySelector(target)
    const ctx = element.getContext("2d")

    const objects = []
    const state = {}

    const add = (object) => objects.push(object)

    const start = () => {
        animate(() => {
            ctx.fillStyle = background || defaultConfig.background
            ctx.fillRect(0, 0, dimensions.width, dimensions.height)

            objects.sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0)).forEach(object => {
                object.update()
                object.render(ctx)
            })
        })
    }

    const resize = (fullscreen) => {
        const resolution = fullscreen 
            ? { width: window.innerWidth, height: window.innerHeight }
            : dimensions || defaultConfig.dimensions
        
        const reduce = (obj, alter) => (
            Object.keys(obj).reduce((acc, cur) => ({
                ...acc,
                [cur]: alter(resolution[cur]) // + "px"
            }), {})
        )

        // https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
        const scale = window.devicePixelRatio

        Object.assign(element, reduce(resolution, (cur) => Math.floor(cur * scale)))
        Object.assign(element.style, reduce(resolution, (cur) => cur + "px"))
        ctx.scale(scale, scale)
    }

    const pixelated = () => {
        element.style.imageRendering = "pixelated"

        const methods = ["imageSmoothingEnabled", "mozImageSmoothingEnabled", "oImageSmoothingEnabled", "webkitImageSmoothingEnabled", "msImageSmoothingEnabled"]
        methods.forEach(method => {
            ctx[method] = false
        })
    }

    return {
        ctx,
        add,
        load,
        start,
        resize,
        pixelated
    }
}

export default canvas