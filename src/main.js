import { createCanvas, getMousePos } from "./canvas";
import { circle } from "./sand";
import { createSlider } from "./slider";
import { World } from "./world";


const { canvas, context } = createCanvas(500, 500, true)
document.body.appendChild(canvas)
const slider = createSlider()
document.body.appendChild(slider)
const wheel = document.createElement("div")
wheel.id = "wheel"
document.body.appendChild(wheel)

const defaultcolor = "#cf0d26"
let pressed = false, color = defaultcolor, pos = {}
const cw = Raphael.colorwheel($("#wheel")[0], 150).color(defaultcolor)
cw.onchange(function(evt) {
  color = evt.hex
})

const buffer = document.createElement("canvas");
buffer.width = canvas.width;
buffer.height = canvas.height;
const bufferCtx = buffer.getContext("2d");


canvas.onmousemove = (event) => pos = getMousePos(canvas, event)
canvas.onmousedown = () => { pressed = true;}
canvas.onmouseup = () => pressed = false

const world = new World(buffer, bufferCtx, 250, false)
const sands = []
const loop = () => {
  if (pressed && pos?.x !== undefined && pos?.y !== undefined) {
    circle(world, world.selection(pos), Number(slider.value()), color).forEach(s => { if (world.add(s)) { sands.push(s)}  })
  }

  const stage = []
  for (const s of sands) {
    if (!s || s.state) {
      continue
    }

    s.clear(context)
    const cb = s.update()
    if (cb) {
      stage.push(cb)
    }
  }

  for (const s of stage) {
    s()
  }


  for (let i = 0; i < sands.length; i++) {
    const s = sands[i]
    s.draw()

    if (s.state) {
      sands.splice(i, 1);
    }
  }

  context.drawImage(buffer, 0, 0);
  window.requestAnimationFrame(loop);
}


loop();