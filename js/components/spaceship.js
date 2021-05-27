import config from "../config.js"
import { vec2, constrain } from "../libs/math.js"

const size = 32
const speed = 2

const reloadSpeed = 0.25
const bulletSpeed = 4

const spaceship = (sprite) => {
    const { dimensions } = config
    let bullets = []

    let reloadTimer

    let position = vec2(dimensions.width / 2 - size / 2, dimensions.height - size - 20)

    const update = (state) => {
        if(state.keys["right"]?.includes("pressed")) {
            position.x = constrain(position.x + speed, 0, dimensions.width - size)
        } else if(state.keys["left"]?.includes("pressed")) {
            position.x = constrain(position.x - speed, 0, dimensions.width - size)
        }

        if(state.keys["space"]?.includes("pressed") && !reloadTimer) {
            bullets.push({ x: position.x + sprite.width / 2 - 2, y: position.y })
            reloadTimer = setTimeout(() => {
                reloadTimer = null
            }, 1000 * reloadSpeed)
        }

        for(let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i]

            bullet.y -= bulletSpeed
            if(bullet.y < -10) {
                bullets.splice(i, 1)
            }
        }

        for(const bullet of bullets) {
        }
    }
    
    const render = (ctx) => {
        for(const bullet of bullets) {
            ctx.fillStyle = "red"
            ctx.fillRect(bullet.x, bullet.y, 2, 5)
        }

        ctx.drawImage(sprite, 2, 2, sprite.width - 2, sprite.height - 2, position.x, position.y, size, size)
    }
    
    return {
        type: "spaceship",
        zIndex: 1,
        update,
        render
    }
}

export default spaceship