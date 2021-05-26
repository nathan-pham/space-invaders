import { vec2 } from "../libs/vector.js"

const spaceship = (sprite, dimensions) => {
    const size = 64
    const position = vec2(dimensions.width / 2 - size / 2, dimensions.height - size - 10)

    const update = () => {

    }
    
    const render = (ctx) => {
        ctx.drawImage(sprite, 2, 2, sprite.width - 2, sprite.height - 2, position.x, position.y, size, size)
    }
    
    return {
        zIndex: 0,
        update,
        render
    }
}

export default spaceship