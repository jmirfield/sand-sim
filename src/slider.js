
export const createSlider = (id = "slider") => {
    const slider = document.createElement("input")
    slider.type = "range"
    slider.min = "1"
    slider.max = "25"
    slider.value = "3"
    slider.id = id

    // Optional: Create label
    const label = document.createElement("label")
    label.htmlFor = id
    label.textContent = "Size: "

    // Optional: Display current value
    const display = document.createElement("span")
    display.textContent = slider.value

    // Update display on input
    slider.oninput = () => {
        display.textContent = slider.value
    }

    const div = document.createElement("div")
    div.appendChild(label)
    div.appendChild(slider)
    div.appendChild(display)

    div.value = () => slider.value;

    return div
}