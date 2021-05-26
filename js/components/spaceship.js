import { vec2, constrain } from "../libs/math.js"

const size = 32
const speed = 2

const spaceship = (sprite, dimensions) => {
    let position = vec2(dimensions.width / 2 - size / 2, dimensions.height - size - 20)

    const update = (state) => {
        if(state.keys["right"]?.includes("pressed")) {
            position.x = constrain(position.x + speed, 0, dimensions.width - size)
        } else if(state.keys["left"]?.includes("pressed")) {
            position.x = constrain(position.x - speed, 0, dimensions.width - size)
        }
    }
    
    const render = (ctx) => {
        ctx.drawImage(sprite, 2, 2, sprite.width - 2, sprite.height - 2, position.x, position.y, size, size)
    }
    
    return {
        type: "spaceship",
        zIndex: 0,
        update,
        render
    }
}

export default spaceship