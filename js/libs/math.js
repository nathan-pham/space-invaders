export const vec2 = (x, y) => {
    return {
        x,
        y,
        clone() {
            return vec2(x, y)
        },
        add(vec) {
            return vec2(x + vec.x, y + vec.y)
        },
        sub(vec) {
            return vec2(x - vec.x, y - vec.y)
        }
    }
}

export const map = (n, inMin, inMax, outMin, outMax) => (
    (n - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
)


export const random = (min, max) => (
    Math.random() * (max - min) + min
)

export const constrain = (n, min, max) => (
    n < min
        ? min
        : n > max
            ? max
            : n
)