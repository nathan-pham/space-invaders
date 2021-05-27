import { vec2, dist } from "../libs/math.js"

const size = 32

const alien = (sprite, dimensions) => {
    let position = vec2(0, 32)
    let health = 10
    let speed = 1

    const update = (state) => {
        const bullets = state.objects.filter(object => object?.type == "spaceship")[0].bullets
        position.x += speed

        if(position.x > dimensions.width - size || position.x < 0) {
            speed *= -1
        }

        for(let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i]

            if(dist(bullet.x, bullet.y, position.x, position.y) < size) {
                bullets.splice(i, 1)
                health -= 1
            }
        }
    }

    const render = (ctx) => {
        if(health > 0) {
            ctx.drawImage(sprite, 0, 0, sprite.width, sprite.height, position.x, position.y, size, size)
        }
    }

    return {
        type: "alien",
        zIndex: 2,
        update,
        render
    }
}

export default alien