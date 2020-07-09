var canvas,backgroundImg;
var gamestate = 0;
var playerCount,allPlayers,player1,player2;
var database,ground1,ground2;
var form,player,game;
var car1,car2,car3,car4,cars;
var car1Image,car2Image,car3Image,car4Image,trackImage;
var playerImage,hurdlesImage;
var obstacleGroup1,obstacleGroup2;
var players = [player1,player2];
var allPlayers;

function preload(){
    playerImage = loadImage("Player.png");
    hurdlesImage = loadImage("obstacle.jpg");
}

function setup(){
    canvas = createCanvas(displayWidth,displayHeight);
    database = firebase.database();
    game = new Game();
    game.getState();
    obstacleGroup1 = new Group();
    obstacleGroup2 = new Group();
    game.start();
}

function draw(){
   if(playerCount === 2){
        game.update(1);
    }
    if(gamestate === 1){
        clear();
        game.play();
    }
    if(gamestate===2){
        game.end();
    }
}