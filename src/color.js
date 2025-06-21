
const colors = [
   "#ff5733",
   "#33b9ff",
   "#ffbf33",
   "#3358ff",
   "#a6cf0d",
   "#cf0dcf",
   "#cf0d26"
];


export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
