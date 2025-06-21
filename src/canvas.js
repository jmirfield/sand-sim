export const createCanvas = (w = 500, h = 500, debug) => {
    var canvas = document.createElement("canvas")
    canvas.width = w;
    canvas.height = h;
    canvas.style.willChange = 'transform';
    if (debug) {
        canvas.style.outline = "solid black 1px"
    }

    var context = canvas.getContext("2d")

    return {
        canvas,
        context
    }
}

export const getMousePos = (canvas, event) => {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}