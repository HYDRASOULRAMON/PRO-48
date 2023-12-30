var myGamePiece;
var myObstacle;
var myScore;

function startGame() {
 myGamePiece = new component(30, 30, "green", 10, 120);
 myObstacle = new component(10, 100, "black", 300, 100);
 myScore = new component("30px", "Consolas", "black", 280, 40, "text");
 myGameArea.start();
}

var myGameArea = {
 canvas : document.getElementById("myCanvas"),
 start : function() {
    this.canvas.width = 600;
    this.canvas.height = 150;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (e) {
      myGameArea.key = e.keyCode;
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.key = false;
    })
 }, 
 clear : function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
 }
}

function component(width, height, color, x, y, type) {
 this.type = type;
 this.width = width;
 this.height = height;
 this.speedX = 0;
 this.speedY = 0;    
 this.x = x;
 this.y = y;    
 this.update = function() {   
    ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
 }
 this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY; 
 }
}

function updateGameArea() {
 myGameArea.clear();
 myGamePiece.speedX = 0;
 myGamePiece.speedY = 0;    
 if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; }
 if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; }
 if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; }
 if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; }
 myObstacle.speedX = -1;
 myGamePiece.newPos();
 myObstacle.newPos();
 myGamePiece.update();
 myObstacle.update();
 myScore.text="SCORE: " + myGamePiece.x;
 myScore.update();
 if (myGamePiece.x + myGamePiece.width >= myObstacle.x) {
    myGameArea.stop();
 }
}