import config from "../config.js"
import { random, map } from "../libs/math.js"

const createStar = (genesis) => {
    const radius = random(1, 4)

    return {
        x: random(0, config.dimensions.width),
        y: genesis ? random(0, config.dimensions.height) : radius * -2,
        radius,
        speed: (1 / radius) * 5,
        color: `rgba(255, 255, 255, ${ map(radius, 1, 4, 1, 0) })`
    }
}

const starfield = (count) => {
    const stars = []

    for(let i = 0; i < count; i++) {
        stars.push(createStar(true))
    }

    const update = (state) => {
        for(let i = 0; i < stars.length; i++) {
            const star = stars[i]
            star.y += star.speed

            if(state.keys["right"]?.includes("pressed")) {
                star.x -= star.speed / 10
            } else if(state.keys["left"]?.includes("pressed")) {
                star.x += star.speed / 10
            }
        
            if(star.y > config.dimensions.height + star.radius) {
                stars.splice(i, 1)
                stars.push(createStar())
            }
        }
    }
    
    const render = (ctx) => {
        for(const star of stars) {
            ctx.fillStyle = star.color
            ctx.fillRect(star.x, star.y, star.radius * 2, star.radius * 2)

            // ctx.beginPath()
            // ctx.arc(star.x, star.y, star.radius * 2, 0, 2 * Math.PI)
            // ctx.fillStyle = star.color
            // ctx.fill()
        }
    }

    return {
        type: "starfield",
        zIndex: 0,
        update,
        render
    }
}

export default starfield