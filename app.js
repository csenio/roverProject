let rover = {
  direction: "N",
  x: 0,
  y: 0,
}

let directionCounter = 0
const directions = ["N", "E", "S", "W"]

let travelLog = [
  [0, 0]
]

let inputVar;

let docInput = document.querySelector("#input")
let positionxDisplay = document.querySelector("#positionx")
let positionyDisplay = document.querySelector("#positiony")
let htmlTable = document.querySelector("#table")
let commandLog = []

let grid = [
  [2,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
]

// 0= empty 
// 1= rover was here 
// 2= rover is here

// x = 3     y = 5
// grid[5[3]]



setDisplay();

function submit(UserInput) {
  inputVar = document.querySelector("input").value.toString()
  commandLog.push(inputVar)
  input(inputVar)
  document.querySelector("input").value = ''
  setDisplay()
}

function gridDisplayer(){
  grid[rover.y][rover.x] = 2;
  console.log(grid)
}

function gridPath(){
  grid[rover.y][rover.x] = 1;
}

updateVisibleTable("new")
updateVisibleTable()


// visible table first try
function updateVisibleTable(state){
let table = document.createElement('table');
for(let row of grid){
  table.insertRow();
  for(let cell of row) {
    let newCell = table.rows[table.rows.length -1].insertCell();
    // newCell.textContent = cell;
    if(cell == 2){
      newCell.style.backgroundColor = "red"
    }else if(cell == 1){
      newCell.style.backgroundColor = "orange"
    }
  }
}

if(state == "new"){htmlTable.appendChild(table);
}else 
{
  htmlTable.removeChild(htmlTable.childNodes[0])
  htmlTable.appendChild(table)
}
};
// //end (works the first time but then only appends)




function reset(){
  rover.x = 0;
  rover.y = 0;
  travelLog = [[0, 0]];
  rover.direction = "N";
  directionCounter = 0;
  commandLog = []
  grid = [
    [2,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
  ]
  setDisplay();
  updateVisibleTable();
}

function setDisplay(){
  positionxDisplay.textContent = rover.x;
  positionyDisplay.textContent = rover.y;
}

function turn(direction) {

  if (direction === "left") {
    directionCounter -= 1
  } else if (direction === "right") {
    directionCounter += 1
  };

  if (directionCounter == 4) {
    directionCounter = 0;
  } else if (directionCounter == -1) {
    directionCounter = 3
  }

  rover.direction = directions[directionCounter]
};

function forward() {

  gridPath();

  switch (rover.direction) {
    case "N":
      rover.y -= 1;
      break;
    case "E":
      rover.x += 1;
      break;
    case "S":
      rover.y += 1;
      break;
    case "W":
      rover.x -= 1;
      break;
  }

  gridEnforce()
  gridDisplayer()
  travelLogger()
  updateVisibleTable()
}

function backwards() {

  gridPath()

  switch (rover.direction) {
    case "N":
      rover.y += 1;
      break;
    case "E":
      rover.x -= 1;
      break;
    case "S":
      rover.y -= 1;
      break;
    case "W":
      rover.x += 1;
      break;
  }

  gridEnforce()
  gridDisplayer()
  travelLogger()
  updateVisibleTable()
}

function gridEnforce() {
  const errorMessage = "Error: Rover can't leave 10x10 Grid! You are to far"
  if (rover.x == 10) {
    rover.x = 9;
    console.log(errorMessage + " East.")
  } else if (rover.x == -1) {
    rover.x = 0;
    console.log(errorMessage + " West.")
  } else if (rover.y == 10) {
    rover.y = 9;
    console.log(errorMessage + " South.")
  } else if (rover.y == -1) {
    rover.y = 0;
    console.log(errorMessage + " North.")
  }
}

function travelLogger() {
  travelLog.push([rover.x, rover.y])
}

function execute(com) {
  switch (com) {
    case "r":
      turn("right");
      break;
    case "l":
      turn("left");
      break;
    case "f":
      forward();
      break;
    case "b":
      backwards();
      break;
  }
}

function input(commands){
  let coms = commands.split("")
  // let coms = commands.toLowerCase().split("")

  for (let i = 0; i < coms.length; i++) {
    if (["f", "b", "l", "r"].includes(coms[i])) {
      execute(coms[i])
    } else {
      console.log("\n ###### \n ERROR:  \n Please use a specified command, the commands are: \n 'f' - to move forward \n 'b' - to move backwards \n 'r' - to turn right \n 'l' - to turn left \n ###### \n")
    }

  }
}


// input("gb")

// console.log( rover )
// console.log( travelLog )






