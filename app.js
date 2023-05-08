let gridItems = document.getElementsByClassName("grid-item");
// Agregar event listener
Array.from(gridItems).forEach((item) => {
  console.log(item.id);
  //addEventListener("onclick", draw(item.id));
});

function getGridSize() {
  return +document.getElementById("grid-size").value;
}


function createBoard() {
  let gridItems = "";
  let gridSize = getGridSize();
  for (let i = 0; i < gridSize ** 2; i++) {
    gridItems += `<div class=grid-item style="width:${
      (1 / gridSize) * 100
    }%; height:${(1 / gridSize) * 100}%"></div>`;
  }
  document.getElementById("board").innerHTML = gridItems;
}

function draw(id) {
  document.getElementById(id).style.background =
    document.getElementById("select-color").value;
}
