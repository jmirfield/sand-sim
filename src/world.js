export class World {
    canvas; ctx; width; height;
    grid = []
    size = 0
    debug = false
    constructor(canvas, ctx, size, debug = false) {
        this.canvas = canvas
        this.ctx = ctx
        this.size = size
        this.debug = debug

        this.width = canvas.width / this.size
        this.height = canvas.height / this.size

        for (let i = 0; i < size; i++) {
            var row = []
            for (let j = 0; j < size; j++) {
                row.push(null)
            }
            this.grid.push(row)
        }
    }

    draw() {
        if (!this.debug) {
            return
        }

        this.ctx.fillStyle = "#000000";
        for (let i = 1; i < this.size; i++) {
            this.ctx.fillRect(i * this.width, 0, 1, this.canvas.height)
            this.ctx.fillRect(0, i * this.height, this.canvas.width, 1)
        }
    }

    selection(pos) {
        if (pos?.x === undefined || pos?.y === undefined || !pos) {
            return
        }

        var x = Math.floor(pos.x / this.width)
        var y = Math.floor(pos.y / this.height)

        return { x, y }
    }

    add(sand) {
        if (sand.pos.x > this.size - 1 || sand.pos.x < 0 || sand.pos.y < 0) {
            return false
        }
        if (this.grid[sand.pos.x][sand.pos.y]) {
            return false
        }

        this.grid[sand.pos.x][sand.pos.y] = sand
        return true
    }
}