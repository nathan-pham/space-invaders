import config from "../config.js"
import { vec2, constrain } from "../libs/math.js"

const size = 32
const speed = 2

const reloadSpeed = 0.2
const bulletSpeed = 4

const spaceship = (sprite, bulletSprite) => {
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
            // triple shot
            bullets.push({ x: position.x + sprite.width / 2 - 11, y: position.y })
            bullets.push({ x: position.x + sprite.width / 2 - 11 - 10, y: position.y + 5})
            bullets.push({ x: position.x + sprite.width / 2 - 11 + 10, y: position.y + 5 })

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
    }
    
    const render = (ctx) => {
        for(const bullet of bullets) {
            ctx.drawImage(bulletSprite, 0, 0, bulletSprite.width, bulletSprite.height, bullet.x, bullet.y, 20, 20)
        }

        ctx.drawImage(sprite, 2, 2, sprite.width - 2, sprite.height - 2, position.x, position.y, size, size)
    }
    
    return {
        type: "spaceship",
        zIndex: 1,
        bullets,
        update,
        render
    }
}

export default spaceship