window.onload = start;
var boxes = document.getElementsByTagName("td");
var turnText = document.querySelector(".playerTurn");
var counter = 1;
var winCounter = 0;
var OMoves = [];
var XMoves = [];

var winCombinations = [[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function start(){
  addXOListener();
  addRestartListener();
}

function addXOListener(){
  for (var i = boxes.length - 1; i >= 0; i--) {
    boxes[i].addEventListener("click", addXO);
  }
}

function addXO(event){
  if (event.target.innerHTML.length === 0){
    if (counter % 2 === 0) {
      OMoves.push(parseInt(event.target.getAttribute("data-val")));
      event.target.innerHTML = "O";
      event.target.setAttribute("class","O");
      turnText.innerHTML = "It is X's turn";
      counter++;
      checkForWin(OMoves, "O");
    }
    else {
      XMoves.push(parseInt(event.target.getAttribute("data-val")));
      event.target.innerHTML = "X";
      event.target.setAttribute("class","X");
      turnText.innerHTML = "It is O's turn";
      counter++;
      checkForWin(XMoves, "X");
    }

  if (counter >= 10){
    turnText.innerHTML = "Game Over!";
    var conf = confirm("It's a draw, do you want to play again?");
    if(conf){
      restartGame();
    }
  }
 }
}

function addRestartListener(){
  var restartButton = document.getElementById("re");
  restartButton.addEventListener("click", restartGame);
}

function checkForWin(movesArray, name){

  for (i = 0; i < winCombinations.length; i++) {

    winCounter = 0;

    for (var j = 0; j < winCombinations[i].length; j++) {

      if(movesArray.indexOf(winCombinations[i][j]) !== -1){
        winCounter++;
      }
    
      if(winCounter === 3){
        alert("Game over, " + name + " wins!");
        restartGame();
      }
    }
  }
}

function restartGame(){
  for (var i = boxes.length - 1; i >= 0; i--) {
    boxes[i].innerHTML="";
    boxes[i].setAttribute("class","clear");
  }
  OMoves = [];
  XMoves = [];
  winCounter=0;
  counter = 1;
  turnText.innerHTML = "It is X's turn";
}
