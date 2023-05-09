////////////////////////////
// Might be updated later //
////////////////////////////
const DEFAULT_MODE = "color"

let mousedown = false;
let currentMode = DEFAULT_MODE;

let opacity=0;

const colorPicker = document.getElementById("select-color");
const rainbowBtn = document.getElementById("rainbow");
const eraserBtn = document.getElementById("eraser");
const gradientBtn = document.getElementById("gradient");
colorPicker.onclick = () => currentMode = "color";
rainbowBtn.onclick = () => currentMode = "rainbow";
eraserBtn.onclick = () => currentMode = "eraser";
gradientBtn.onclick = () => currentMode = "gradient";

document.body.onmousedown = () => mousedown = true;
document.body.onmouseup = () => mousedown = false;


function getGridSize() {
  return +document.getElementById("grid-size").value;
}

function getCurrentColor() {
  const color =document.getElementById("select-color").value;
  const r = parseInt(color.substr(1,2), 16);
  const g = parseInt(color.substr(3,2), 16);
  const b = parseInt(color.substr(5,2), 16);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}


function createBoard() {
  const gridSize = getGridSize();
  const itemSize = (1 / gridSize) * 100;
  let gridItems = "";
  for (let i = 0; i < gridSize ** 2; i++) {
    gridItems += `<div style="width:${itemSize}%; height:${itemSize}%" class="grid-item"></div>`;
  }
  document.getElementById("board").innerHTML = gridItems;
  addEventListenerForEachItem();
}

function addEventListenerForEachItem() {
  const gridItems = document.getElementsByClassName("grid-item");
  const gridItemsArray = Array.from(gridItems);
  gridItemsArray.forEach((item) => {
    item.addEventListener("mouseover", draw);
    item.addEventListener("mousedown", draw);
  });
}


function draw(e){
  if(e.type ==="mouseover" && !mousedown) return;
  if(currentMode ==="color"){
    e.target.style.backgroundColor= getCurrentColor();
  } else if(currentMode ==="rainbow"){
    const randomR = Math.floor(Math.random()*256);
    const randomG = Math.floor(Math.random()*256);
    const randomB = Math.floor(Math.random()*256);
    e.target.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`;
  } else if (currentMode==="gradient"){

    if (e.target.style.backgroundColor.match(/rgba/)) {
      let currentOpacity = Number(e.target.style.backgroundColor.slice(-4, -1));
      if (currentOpacity <= 0.9) {
          e.target.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
      }
  } else if (e.target.style.backgroundColor == 'rgb(0, 0, 0)') {
      return;
  } else {
      e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
  }

  } else if(currentMode==="eraser"){
    e.target.style.backgroundColor = "rgb(236, 236, 236)";
  }
  
}