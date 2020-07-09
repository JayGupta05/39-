class Game{
    constructor(){}

    getState(){
        var gameStateRef = database.ref("gamestate");
        gameStateRef.on('value',function(data){
            gamestate = data.val();
        })
    }

    update(state){
        database.ref('/').update({
            gamestate : state
        })
    }

    start(){
        if(gamestate === 0){
            player = new Player();
            player.getCount();
            form = new Form();
            form.display();
        }  
        // create two ground and player sprites.
        player1 = createSprite(150,100,50,50);
        player1.scale = 0.5;
        player1.addImage(playerImage);
        player2 = createSprite(180,100,50,50);
        player2.scale = 0.5;
        player2.addImage(playerImage);
        ground1 = createSprite(displayWidth/2,displayHeight/2-40,displayWidth,displayHeight/2);
        ground2 = createSprite(displayWidth/2,displayHeight/4-40,displayWidth,displayWidth/2);
        //use for loop to create hurdles.       
        for (var i = 600; i<6000; i = i+ 700){
            var obstacle1 = createSprite(i,225);
            obstacleGroup1.add(obstacle1);
            var obstacle2 = createSprite(i,225);
            obstacleGroup2.add(obstacle2);
        }
    }

    play(){
        form.hide();
        var getPlayerInfo = database.ref('players');
        getPlayerInfo.on('value',(data)=>{
            players = data.val();
        })
        if(allPlayers !== undefined){
            player1.collide(ground1);
            player2.collide(ground2);
            var index = 0;
            var y = 100;
            var x;
            for(var p in allPlayers){
                index++;
                y+=200;
                x = displayWidth - [p].score;
                players[index-1].x = x;
                players[index-1].y = y;
                if(index === player.index){
                    camera.position.x = displayHeight/2;
                    camera.position.y = cars[index-1].y;
                    if(keyDown(space)){
                        player.velocityY = -12;
                    }
                    player.velocityY = player.velocityY+0.8;
                }
            }
        }

        if(keyDown(RIGHT_ARROW)){
            player.score+=50;
            player.update();
        }
        drawSprites();
    }

    end(){
        console.log("Game has ended.");
    }
}