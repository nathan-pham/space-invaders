import { vec2, dist, random } from "../libs/math.js"
import config from "../config.js"

const size = 32

const alien = (sprite) => {
    const { dimensions } = config
    let position, health, speed

    const reset = () => {
        health = 10
        speed = Math.random() > 0.5 ? -1 : 1
        position = vec2(random(0, dimensions.width - sprite.width), - sprite.height - 10)
    }

    const update = (state) => {
        const bullets = state.objects.filter(object => object?.type == "spaceship")[0].bullets
        position.x += speed
        position.y += 0.25

        if(position.x > dimensions.width - size || position.x < 0) {
            speed *= -1
        }
        
        if(health > 0) {
            for(let i = 0; i < bullets.length; i++) {
                const bullet = bullets[i]
    
                if(dist(bullet.x, bullet.y, position.x, position.y) < size) {
                    bullets.splice(i, 1)
                    health -= 1
                }
            }
        } else {
            reset()
        }
    }

    const render = (ctx) => {
        if(health > 0) {
            ctx.drawImage(sprite, 0, 0, sprite.width, sprite.height, position.x, position.y, size, size)
        }
    }

    reset()

    return {
        type: "alien",
        zIndex: 2,
        update,
        render
    }
}

export default alien