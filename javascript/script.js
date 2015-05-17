"use strict";

var pacmanImage;
var speed = 50;
var pinkGhost;
var cyanGhost;
var yellowGhost;
var limeGhost;
var panicPink;
var panicCyan;
var panicYellow;
var panicLime;
var pacmanFood;
var superFood;
var pacmanLife = 3;
var counter = 0;
var panicMode = false;
var foodPosX = 
    [
        {x:25, y:25},
        {x:228, y:25},
        {x:557, y:25},
        {x:760, y:5},
    ];
    
var foodPosY =
    [
        {x:5, y:565},
        {x:5, y:25},
    ];
    
var game = new Phaser.Game(
    800, 600, Phaser.AUTO, '',
    { preload: preload, create: create, update: update }
    );
    
    function preload()
    {
        game.load.image('pacman', 'pics/pacman.png');
        game.load.image('pacmanfood','pics/pacmanfood.png');
        game.load.image('horizontalwall', 'pics/horizontalwall.png');
        game.load.image('verticalwall', 'pics/verticalwall.png');
        game.load.image('minerwall', 'pics/minerwall.png');
        game.load.image('smallvw', 'pics/Smallvw.png');
        game.load.image('smallhw', 'pics/smalhw.png');
        game.load.image('prisonhw', 'pics/prisonhw.png');
        game.load.image('prisonvw', 'pics/prisonvw.png');
        game.load.image('minerprisonw', 'pics/minerprisonw.png');
        game.load.image('pinkghost', 'pics/pinkghost.png');
        game.load.image('cyanghost', 'pics/cyanghost.png');
        game.load.image('yellowghost', 'pics/yellowghost.png');
        game.load.image('limeghost', 'pics/limeghost.png');
        game.load.image('panicghost', 'pics/panicghost.png');
        game.load.image('superpacman', 'pics/superpacman.png');
    }
    
    function create()
    {
        //Pac-Man 
        pacmanImage = game.add.sprite(770, 570, 'pacman');
        pacmanImage.anchor.setTo(.5, .5);
        game.physics.arcade.enable(pacmanImage);
        
        // Ghosts!
        this.ghosts = game.add.group();
        this.ghosts.enableBody = true;
        
        pinkGhost = game.add.sprite(380, 310, 'pinkghost', 0, this.ghosts);
        cyanGhost = game.add.sprite(410, 310, 'cyanghost', 0, this.ghosts);
        yellowGhost = game.add.sprite(410, 270, 'yellowghost', 0, this.ghosts);
        limeGhost = game.add.sprite(380, 270, 'limeghost', 0, this.ghosts);
        
        pinkGhost.body.velocity.y = speed;
        cyanGhost.body.velocity.y = speed;
        yellowGhost.body.velocity.y = speed;
        limeGhost.body.velocity.y = speed;
        
        this.ghosts.setAll('body.immovable', true);
        
        game.physics.arcade.enable(pinkGhost, cyanGhost, yellowGhost, limeGhost);
       
        //Pac-Man Food!
        //Makes Groop of Food
        this.pacmanFoods = game.add.group();
        this.pacmanFoods.enableBody = true;
   
        //add new Food!
        for(var i = 0; i < 26; i++)
        {
            foodPosX.forEach(function(pos){
                pos.y += 20;
                counter += 1;
                pacmanFood = game.add.sprite(pos.x, pos.y, 'pacmanfood', 0, this.pacmanFoods); 
            }.bind(this));
        }
        
        for(var j = 0; j < 36; j++)
        {
            foodPosY.forEach(function(pos){
               pos.x += 20;
               counter += 1;
               pacmanFood = game.add.sprite(pos.x, pos.y, 'pacmanfood', 0, this.pacmanFoods); 
            }.bind(this));
        }
        
        this.pacmanFoods.setAll('body.immovable', true);
        game.physics.arcade.enable(pacmanFood);
        
        //Create super food!
        
        this.superFoods = game.add.group();
        this.superFoods.enableBody = true;
        
        superFood = game.add.sprite(698, 70, 'superpacman', 0, this.superFoods);
        superFood = game.add.sprite(698, 510, 'superpacman', 0, this.superFoods);
        superFood = game.add.sprite(70, 510, 'superpacman', 0, this.superFoods);
        superFood = game.add.sprite(70, 70, 'superpacman', 0, this.superFoods);
        
        
        this.superFoods.setAll('body.immovable', true);
        game.physics.arcade.enable(superFood);
        
        //Create Wall groop!
        this.walls = game.add.group();
        this.walls.enableBody = true;
        
        //Making walls inside the group!
        game.add.sprite(0, 0, 'verticalwall', 0, this.walls);
        game.add.sprite(781, 0, 'verticalwall', 0, this.walls);
        game.add.sprite(781, 300, 'verticalwall', 0, this.walls);
        game.add.sprite(0, 300, 'verticalwall', 0, this.walls);
        game.add.sprite(0, 581, 'horizontalwall', 0, this.walls);
        game.add.sprite(400, 581, 'horizontalwall', 0, this.walls);
        game.add.sprite(0, 0, 'horizontalwall', 0, this.walls);
        game.add.sprite(400, 0, 'horizontalwall', 0, this.walls);
        
        game.add.sprite(730, 440, 'smallvw', 0, this.walls);
        game.add.sprite(730, 243, 'smallvw', 0, this.walls);
        game.add.sprite(644, 243, 'smallhw', 0, this.walls);
        game.add.sprite(730, 45, 'smallvw', 0, this.walls);
        game.add.sprite(45, 440, 'smallvw', 0, this.walls);
        game.add.sprite(45, 243, 'smallvw', 0, this.walls);
        game.add.sprite(45, 243, 'smallhw', 0, this.walls);
        game.add.sprite(45, 45, 'smallvw', 0, this.walls);
        
        game.add.sprite(200, 243, 'smallvw', 0, this.walls);
        game.add.sprite(114, 329, 'smallhw', 0, this.walls);
        game.add.sprite(250, 243, 'smallvw', 0, this.walls);
        game.add.sprite(530, 243, 'smallvw', 0, this.walls);
        game.add.sprite(580, 243, 'smallvw', 0, this.walls);
        game.add.sprite(580, 329, 'smallhw', 0, this.walls);
   
        game.add.sprite(625, 525, 'smallhw', 0, this.walls);
        game.add.sprite(425, 525, 'smallhw', 0, this.walls);
        game.add.sprite(270, 525, 'smallhw', 0, this.walls);
        game.add.sprite(64, 525, 'smallhw', 0, this.walls);
        
        game.add.sprite(625, 45, 'smallhw', 0, this.walls);
        game.add.sprite(425, 45, 'smallhw', 0, this.walls);
        game.add.sprite(270, 45, 'smallhw', 0, this.walls);
        game.add.sprite(64, 45, 'smallhw', 0, this.walls);
        
        game.add.sprite(675, 470, 'minerwall', 0, this.walls);
        game.add.sprite(675, 385, 'minerwall', 0, this.walls);
        game.add.sprite(425, 470, 'minerwall', 0, this.walls);
        game.add.sprite(425, 385, 'minerwall', 0, this.walls);
        game.add.sprite(270, 470, 'minerwall', 0, this.walls);
        game.add.sprite(270, 385, 'minerwall', 0, this.walls);
        game.add.sprite(97, 470, 'minerwall', 0, this.walls);
        game.add.sprite(97, 385, 'minerwall', 0, this.walls);
        game.add.sprite(354, 470, 'minerwall', 0, this.walls);
        game.add.sprite(354, 385, 'minerwall', 0, this.walls);
        game.add.sprite(509, 470, 'minerwall', 0, this.walls);
        game.add.sprite(509, 385, 'minerwall', 0, this.walls);
        
        game.add.sprite(97, 103, 'minerwall', 0, this.walls);
        game.add.sprite(97, 187, 'minerwall', 0, this.walls);
        game.add.sprite(270, 103, 'minerwall', 0, this.walls);
        game.add.sprite(270, 187, 'minerwall', 0, this.walls);
        game.add.sprite(354, 103, 'minerwall', 0, this.walls);
        game.add.sprite(354, 187, 'minerwall', 0, this.walls);
        game.add.sprite(425, 103, 'minerwall', 0, this.walls);
        game.add.sprite(425, 187, 'minerwall', 0, this.walls);
        game.add.sprite(509, 103, 'minerwall', 0, this.walls);
        game.add.sprite(509, 187, 'minerwall', 0, this.walls);
        game.add.sprite(675, 103, 'minerwall', 0, this.walls);
        game.add.sprite(675, 187, 'minerwall', 0, this.walls);
        
        game.add.sprite(312, 243, 'prisonhw', 0, this.walls);
        game.add.sprite(472, 243, 'prisonvw', 0, this.walls);
        game.add.sprite(312, 243, 'prisonvw', 0, this.walls);
        game.add.sprite(312, 332, 'minerprisonw', 0, this.walls);
        game.add.sprite(426, 332, 'minerprisonw', 0, this.walls);
    
        this.walls.setAll('body.immovable', true);
    }
    
    function update()
    {
        
           //PinKGhost movment!
           if (pinkGhost.y > 500 && pinkGhost.body.velocity.y == speed)
           {
               pinkGhost.body.velocity.y = 0;
               pinkGhost.body.velocity.x = -speed;
           }
           if (pinkGhost.x < 230  && pinkGhost.body.velocity.x == -speed)
           {
               pinkGhost.body.velocity.x = 0;
               pinkGhost.body.velocity.y = -speed;
           }
                 
           if (pinkGhost.y < 30 && pinkGhost.body.velocity.y == -speed)
           {
               pinkGhost.body.velocity.y = 0;
               pinkGhost.body.velocity.x = speed;
           }
           if(pinkGhost.x > 550 && pinkGhost.body.velocity.x == speed)
           {
               pinkGhost.body.velocity.x = 0;
               pinkGhost.body.velocity.y = speed;
           }
           
           
           //CyanGhost Movment!
            if (cyanGhost.y > 500 && cyanGhost.body.velocity.y == speed)
           {
               cyanGhost.body.velocity.y = 0;
               cyanGhost.body.velocity.x = speed;
           }
           if (cyanGhost.x > 555  && cyanGhost.body.velocity.x == speed)
           {
               cyanGhost.body.velocity.x = 0;
               cyanGhost.body.velocity.y = -speed;
           }
                 
           if (cyanGhost.y < 30 && cyanGhost.body.velocity.y == -speed)
           {
               cyanGhost.body.velocity.y = 0;
               cyanGhost.body.velocity.x = -speed;
           }
           if(cyanGhost.x < 230 && cyanGhost.body.velocity.x == -speed)
           {
               cyanGhost.body.velocity.x = 0;
               cyanGhost.body.velocity.y = speed;
           }
           
           
           //YellowGhost Movment!
           
           if (yellowGhost.y > 565 && yellowGhost.body.velocity.y == speed)
           {
               yellowGhost.body.velocity.y = 0;
               yellowGhost.body.velocity.x = speed;
           }
           if (yellowGhost.x > 760  && yellowGhost.body.velocity.x == speed)
           {
               yellowGhost.body.velocity.x = 0;
               yellowGhost.body.velocity.y = -speed;
           }
                 
           if (yellowGhost.y < 30 && yellowGhost.body.velocity.y == -speed)
           {
               yellowGhost.body.velocity.y = 0;
               yellowGhost.body.velocity.x = -speed;
           }
           if(yellowGhost.x < 30 && yellowGhost.body.velocity.x == -speed)
           {
               yellowGhost.body.velocity.x = 0;
               yellowGhost.body.velocity.y = speed;
           }
           
           
           //LimeGhost Movment!
           
           if (limeGhost.y > 565 && limeGhost.body.velocity.y == speed)
           {
               limeGhost.body.velocity.y = 0;
               limeGhost.body.velocity.x = -speed;
           }
           if (limeGhost.x < 30  && limeGhost.body.velocity.x == -speed)
           {
               limeGhost.body.velocity.x = 0;
               limeGhost.body.velocity.y = -speed;
           }
                 
           if (limeGhost.y < 30 && limeGhost.body.velocity.y == -speed)
           {
               limeGhost.body.velocity.y = 0;
               limeGhost.body.velocity.x = speed;
           }
           if(limeGhost.x > 760 && limeGhost.body.velocity.x == speed)
           {
               limeGhost.body.velocity.x = 0;
               limeGhost.body.velocity.y = speed;
           }
        
         // Wall Collision!
        game.physics.arcade.collide(pacmanImage, this.walls);
        
        //Eat superfood!
        game.physics.arcade.collide(pacmanImage,this.superFoods, pacmanTastes);
        
        //Eat Food (Collisions)!
        game.physics.arcade.collide(pacmanImage, this.pacmanFoods, pacmanEats);
        
        //Ghost Collision
        if(!panicMode)
        {
             game.physics.arcade.overlap(pacmanImage, this.ghosts, pacmanDies);
        }
        else
        {
             game.physics.arcade.overlap(pacmanImage, this.ghosts, pacmanKills);   
        }
        
        //Controls
            pacmanImage.body.collideWorldBounds = true;
            pacmanImage.body.velocity.x = 0;
            pacmanImage.body.velocity.y = 0;
            
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            pacmanImage.body.velocity.x = -130;
            pacmanImage.scale.x = -1;
     
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            pacmanImage.body.velocity.x = 130;
            pacmanImage.scale.x = 1;
        }
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            pacmanImage.body.velocity.y = -130;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            pacmanImage.body.velocity.y = 130;
        }
    }
    
    //Ghost movment!
  
  
    
    //Runs when pacman eats food!
    function pacmanEats(pacman, pacmanfood)
    {
        pacmanfood.kill();
        counter -=1;
        if(counter <= 0)
        {
            setTimeout(function(){ alert('YOU WIN') }, 100);
        }
    }
    
    function pacmanDies(pacman, pinkghost, cyanghost, yellowghost, limeghost)
    {
        pacmanImage.kill();
        
        pacmanImage = game.add.sprite(770, 570, 'pacman');
        pacmanImage.anchor.setTo(.5, .5);
        game.physics.arcade.enable(pacmanImage);
        
        pacmanLife = pacmanLife -1;
        
        if(pacmanLife == 0)
        {
            alert('GAME OVER!');
        }
        console.log(pacmanLife);
    }
    
    function pacmanTastes(pacman, superfood)
    {
        superfood.kill();
        
        panicPink = game.add.sprite(300, 150, 'panicghost', 0, this.ghosts);
        panicCyan = game.add.sprite(490, 210, 'panicghost', 0, this.ghosts);
        panicYellow = game.add.sprite(130, 400, 'panicghost', 0, this.ghosts);
        panicLime = game.add.sprite(300, 200, 'panicghost', 0, this.ghosts);
        
        game.physics.arcade.enable( panicPink, panicCyan, panicYellow, panicLime);
        game.physics.arcade.overlap(pacmanImage, this.ghosts, pacmanKills);
        
        panicMode = true;
        
        pinkGhost.kill();
        cyanGhost.kill();
        yellowGhost.kill();
        limeGhost.kill();
        
        setTimeout(function()
        {
            this.ghosts = game.add.group();
            this.ghosts.enableBody = true;
            
            pinkGhost = game.add.sprite(300, 150, 'pinkghost', 0, this.ghosts);
            cyanGhost = game.add.sprite(490, 210, 'cyanghost', 0, this.ghosts);
            yellowGhost = game.add.sprite(130, 400, 'yellowghost', 0, this.ghosts);
            limeGhost = game.add.sprite(300, 200, 'limeghost', 0, this.ghosts);
            
            this.ghosts.setAll('body.immovable', true);
        
            game.physics.arcade.enable(pinkGhost, cyanGhost, yellowGhost, limeGhost);
            game.physics.arcade.overlap(pacmanImage, this.ghosts, pacmanDies);
            
            panicMode = false;
        }, 10000);
    }
    
    function pacmanKills(pacman, panicghost)
    {
        panicPink.kill();
    }
    function enemyMovement()
    {
        
    }


 