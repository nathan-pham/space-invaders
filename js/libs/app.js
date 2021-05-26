const defaultConfig = {
    dimensions: {
        width: 600,
        height: 480
    }
}

const app = ({ target, dimensions, background }) => {
    const element = document.querySelector(target)
    const ctx = element.getContext("2d")

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
        Object.assign(element.style, reduce(resolution, (cur) => cur + "px"))
        Object.assign(element, reduce(resolution, (cur) => Math.floor(cur * window.devicePixelRatio)))
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
        resize,
        pixelated
    }
}

export default app