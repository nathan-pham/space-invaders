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

export const constrain = (n, a, b) => {
    if(n < a) {
        return a
    } else if(n > b) {
        return b
    }

    return n
}
