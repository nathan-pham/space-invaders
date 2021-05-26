import animate from "./animate.js"
import { load } from "./assets.js"

const defaultConfig = {
    dimensions: {
        width: 600,
        height: 480
    },
    background: "#000000"
}

const keyMap = {
    "ArrowRight": "right",
    "ArrowLeft": "left",
    "ArrowDown": "down",
    "ArrowUp": "up",
    " ": "space"
}

const preventDefaultKeys = ["space", "left", "right", "up", "down", "tab", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11"]

const listen = (element, state) => {
    element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect()

        state.mouse = {
            ...state.mouse,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    })

    element.addEventListener("mousedown", () => {
        state.mouse.down = true
    })

    element.addEventListener("mouseup", () => {
        state.mouse.down = false
    })

    element.addEventListener("touchstart", (e) => {
		const t = e.touches[0]
        state.mouse = {
            x: t.clientX,
            y: t.clientY,
            down: true
        }
	})

	element.addEventListener("touchmove", (e) => {
        const t = e.touches[0]
        state.mouse = {
            ...state.mouse,
            x: t.clientX,
            y: t.clientY
        }
	})

    element.addEventListener("keydown", (e) => {
		const key = keyMap[e.key] || e.key.toLowerCase()

        if (preventDefaultKeys.includes(key)) {
			e.preventDefault()
		}

        if(e.repeat) {
            state.keys[key] = "r-pressed"
        } else {
            state.keys[key] = "pressed"
        }
	})

	element.addEventListener("keyup", (e) => {
		const key = keyMap[e.key] || e.key.toLowerCase()
        state.keys[key] = "released"
	})
}

const canvas = ({ target, dimensions, background }) => {
    const element = document.querySelector(target)
    const ctx = element.getContext("2d")

    const objects = []
    const state = {
        keys: {},
        mouse: { x: 0, y: 0, down: false }
    }

    const add = (object) => objects.push(object)

    const start = () => {
        element.setAttribute("tabindex", "0")
        element.focus()

        listen(element, state)

        animate(() => {
            ctx.fillStyle = background || defaultConfig.background
            ctx.fillRect(0, 0, dimensions.width, dimensions.height)

            objects.sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0)).forEach(object => {
                object.update({ ...state, objects })
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