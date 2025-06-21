// 0 falling
// 1 grounded

export class Sand {
    world; pos;
    color; state
    constructor(world, pos, color) {
        this.world = world
        this.pos = pos
        this.color = color
        this.state = 0
    }

    draw() {
        this.world.ctx.fillStyle = this.color;
        this.world.ctx.fillRect(this.pos.x * this.world.width, this.pos.y * this.world.height, this.world.width, this.world.height)
    }

    clear(ctx) {
        const x = Math.floor(this.pos.x * this.world.width);
        const y = Math.floor(this.pos.y * this.world.height);
        const width = Math.ceil(this.world.width);
        const height = Math.ceil(this.world.height);

        this.world.ctx.clearRect(x, y, width, height);
        ctx.clearRect(x, y, width, height)
    }

    checkbelow = () => {
        if (this.pos.y + 1 >= this.world.size - 1) {
            return true
        }
        return !!this.world.grid[this.pos.x][this.pos.y + 1]
    }

    checkleft = () => {
        if (this.pos.x - 1 < 0) {
            return true
        }
        return !!this.world.grid[this.pos.x - 1][this.pos.y + 1]
    }

    checkright = () => {
        if (this.pos.x + 1 >= this.world.size - 1) {
            return true
        }
        return !!this.world.grid[this.pos.x + 1][this.pos.y + 1]
    }

    getbelow = () => {
        if (this.pos.y + 1 >= this.world.size - 1) {
            return
        }
        return this.world.grid[this.pos.x][this.pos.y + 1]
    }

    getleft = () => {
        if (this.pos.x - 1 < 0) {
            return
        }
        return this.world.grid[this.pos.x - 1][this.pos.y + 1]
    }

    getright = () => {
        if (this.pos.x + 1 >= this.world.size - 1) {
            return
        }
        return this.world.grid[this.pos.x + 1][this.pos.y + 1]
    }

    gobelow = () => {
        if (this.pos.y + 1 >= this.world.size - 1) {
            return
        }

        this.world.grid[this.pos.x][this.pos.y] = undefined
        this.pos.y++
        this.world.grid[this.pos.x][this.pos.y] = this
    }

    goleft = () => {
        if (this.pos.x - 1 < 0) {
            return
        }
        this.world.grid[this.pos.x][this.pos.y] = undefined
        this.pos.y++
        this.pos.x--
        this.world.grid[this.pos.x][this.pos.y] = this
    }

    goright = () => {
        if (this.pos.x + 1 >= this.world.size - 1) {
            return
        }
        this.world.grid[this.pos.x][this.pos.y] = undefined
        this.pos.y++
        this.pos.x++
        this.world.grid[this.pos.x][this.pos.y] = this
    }

    update() {
        const { x, y } = this.pos

        if (y >= this.world.size - 1) {
            this.state = 1
            return
        }

        const isbelow = this.checkbelow()
        const isleft = this.checkleft()
        const isright = this.checkright()
        if (isbelow) {
            if (isleft && isright) {
                if (
                    (this.getleft()?.state || x - 1 < 0) &&
                    (this.getright()?.state || x + 1 > this.world.size - 1) &&
                    (y + 1 >= this.world.size - 1 || this.getbelow().state)
                )
                    this.state = 1
                return
            }

            if (!isleft && !isright) {
                if (!Math.round(Math.random())) {
                    return this.goleft
                } else {
                    return this.goright
                }
            }

            if (!isleft) {
                return this.goleft
            }

            if (!isright) {
                return this.goright
            }
        }

        return this.gobelow
    }
}

export const circle = (world, p, radius, color) => {
    const { x, y } = p
    const sands = []

    for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
            if (dx * dx + dy * dy <= radius * radius) {
                sands.push(new Sand(world, { x: x + dx, y: y + dy }, color))
            }
        }
    }

    return sands
}