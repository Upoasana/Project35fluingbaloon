var hypnoticBall, database;
var position;
var ballImg ,background;
function preload(){
backgroundimg=loadImage("cityImage.png");
ballImg=loadAnimation("HotAirBallon-01.png","HotAirBallon-02.png","HotAirBallon-03.png")



}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(1000,1000);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.addAnimation("fly",ballImg);
  hypnoticBall.scale=.5

  hypnoticBall.shapeColor = "red";


  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background(backgroundimg);
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  //console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
