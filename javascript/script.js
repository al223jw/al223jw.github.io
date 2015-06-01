"use strict";
(function()
{
    var winText;
    var gameOver;
    var yorTime;
   
    var counterTag;
    
    var pacmanImage;
    var speed = 50;
    var pinkGhost;
    var cyanGhost;
    var yellowGhost;
    var limeGhost;
    var cyanAlive = false;
    var pinkAlive = false;
    var yellowAlive = false;
    var limeAlive = false;
    var pacmanFood;
    var superFood;
    var pacmanLife = 3;
    var counter = 0;
    var timer = 0;
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
            game.load.image('pacmanleft', 'pics/pacmanleft.png');
            game.load.image('pacmanup', 'pics/pacmanup.png');
            game.load.image('pacmandown', 'pics/pacmandown.png');
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
            game.load.image('pacmanfood','pics/pacmanfood.png');
            game.load.image('superpacman', 'pics/superpacman.png');
            game.load.image('wintext', 'pics/wintext.png');
            game.load.image('restart', 'pics/restart.png');
            game.load.image('gameover','pics/gameover.png');
        }
        
        function create()
        {
            var restart = document.getElementById('submit');
            
            
            restart.addEventListener("click", function(e)
            {  
            e.preventDefault();
            location.reload();
            });
            // Timer
             game.time.events.loop(Phaser.Timer.SECOND, timerfunction);
             
            //Pac-Man 
            pacmanImage = game.add.sprite(770, 570, 'pacman');
            pacmanImage.anchor.setTo(.5, .5);
            game.physics.arcade.enable(pacmanImage);
            
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
            
            // Ghosts!
            this.ghosts = game.add.group();
            this.ghosts.enableBody = true;
            this.ghosts.setAll('body.immovable', true);
            createEnemies();
            
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
        function createEnemies()
        {
            if(!pinkAlive)
            {
                pinkGhost = game.add.sprite(387, 315, 'pinkghost');
                pinkGhost.anchor.setTo(0.45, 0.45);
                pinkAlive = true;
                game.physics.arcade.enable(pinkGhost);
                pinkGhost.body.immovable = true;
            }
            
            if(!cyanAlive)
            {
                cyanGhost = game.add.sprite(416, 315, 'cyanghost');
                cyanGhost.anchor.setTo(0.45, 0.45);
                cyanAlive = true;
                game.physics.arcade.enable(cyanGhost);
                 cyanGhost.body.immovable = true;
            }
           
            if(!yellowAlive)
            {
                yellowGhost = game.add.sprite(416, 280, 'yellowghost');
                yellowGhost.anchor.setTo(0.45, 0.45);
                yellowAlive = true;
                game.physics.arcade.enable(yellowGhost);
                yellowGhost.body.immovable = true;
            }
            
            if(!limeAlive)
            {
                limeGhost = game.add.sprite(387, 280, 'limeghost');
                limeGhost.anchor.setTo(0.45, 0.45);
                limeAlive = true;
                game.physics.arcade.enable(limeGhost);
                limeGhost.body.immovable = true;
            }
            setTimeout(function()
            {
                pinkGhost.body.velocity.y = speed;
                cyanGhost.body.velocity.y = speed;
                yellowGhost.body.velocity.y = speed;
                limeGhost.body.velocity.y = speed;
            }, 5000);
            
        }
        function update()
        {
            console.log(pacmanImage.y, pacmanImage.x);
            GhostMovment();
           
             // Wall Collision!
            game.physics.arcade.collide(pacmanImage, this.walls);
            
            //Eat superfood!
            game.physics.arcade.collide(pacmanImage,this.superFoods, pacmanTastes);
            
            //Eat Food (Collisions)!
            game.physics.arcade.collide(pacmanImage, this.pacmanFoods, pacmanEats);
            
            //Ghost Collision
            if(!panicMode)
            {
                 game.physics.arcade.collide(pacmanImage, pinkGhost, pacmanDies);
                 game.physics.arcade.collide(pacmanImage, cyanGhost, pacmanDies);
                 game.physics.arcade.collide(pacmanImage, yellowGhost, pacmanDies);
                 game.physics.arcade.collide(pacmanImage, limeGhost, pacmanDies);
            }
            else
            {
                 game.physics.arcade.collide(pacmanImage, pinkGhost, pacmanKillsPink);
                 game.physics.arcade.collide(pacmanImage, cyanGhost, pacmanKillsCyan);
                 game.physics.arcade.collide(pacmanImage, yellowGhost, pacmanKillsYellow);
                 game.physics.arcade.collide(pacmanImage, limeGhost, pacmanKillsLime);
            }
            
            //Controls
                pacmanImage.body.collideWorldBounds = true;
                pacmanImage.body.velocity.x = 0;
                pacmanImage.body.velocity.y = 0;
                
            if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                pacmanImage.loadTexture('pacmanleft');
                pacmanImage.body.velocity.x = -105;
            }
            else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                pacmanImage.loadTexture('pacman');
                pacmanImage.body.velocity.x = 105;
            }
            
            if(game.input.keyboard.isDown(Phaser.Keyboard.UP))
            {
                pacmanImage.loadTexture('pacmanup');
                pacmanImage.body.velocity.y = -105;
            }
            else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
            {
                pacmanImage.loadTexture('pacmandown');
                pacmanImage.body.velocity.y = 105;
            }
        }
        
        //Runs when pacman eats food!
        function pacmanEats(pacman, pacmanfood)
        {
            pacmanfood.kill();
            counter -=1;
            if(counter <= 0)
            {
                timerfunction();
                
                winText = game.add.text(game.add.sprite(170, 200, 'wintext'));
                
                yorTime = game.add.text(400, 400, counterTag.innerHTML, { font: "50px Arial", fill: "#ffffff", align: "center", backgroundColor: "000000", width: 400, height: 400 });
                yorTime.anchor.setTo(0.5, 0.5);
                
                game.paused = true;
            }
        }
        
        function pacmanDies(pacman, pinkghost, cyanghost, yellowghost, limeghost)
        {
            pacmanImage.kill();
            
            pacmanImage = game.add.sprite(770, 570, 'pacman');  
            pacmanImage.anchor.setTo(.5, .5);
            game.physics.arcade.enable(pacmanImage);
        
            pacmanLife--;
            
            if(pacmanLife == 0)
            {
                gameOver = game.add.text(game.add.sprite(147, 200, 'gameover'));
                gameOver.anchor.setTo(0.5, 0.5);
                
                game.paused = true;
            }
        }
        
        function pacmanTastes(pacman, superfood)
        {
            superfood.kill();
            
            panicMode = true;
            
            pinkGhost.loadTexture('panicghost');
            cyanGhost.loadTexture('panicghost');
            yellowGhost.loadTexture('panicghost');
            limeGhost.loadTexture('panicghost');
            
    
            
            setTimeout(function()
            {
                pinkGhost.loadTexture('pinkghost');
                cyanGhost.loadTexture('cyanghost');
                yellowGhost.loadTexture('yellowghost');
                limeGhost.loadTexture('limeghost');
                
                panicMode = false;
            }, 10000);
        }
        
        function pacmanKillsPink(pacman, pinkGhost)
        {
            pinkGhost.kill();
            pinkAlive = false;
            createEnemies();
        }
        
        function pacmanKillsCyan(pacman, cyanGhost)
        {
            cyanGhost.kill();
            cyanAlive = false;
            createEnemies();
        }
        
        function pacmanKillsYellow(pacman, yellowGhost)
        {
            yellowGhost.kill();
            yellowAlive = false;
            createEnemies();
        }
        
        function pacmanKillsLime(pacman, limeGhost)
        {
            limeGhost.kill();
            limeAlive = false;
            createEnemies();
        }
        
        function GhostMovment()
        {
                //PinKGhost movment!
                
                if (pinkGhost.y > 505 && pinkGhost.body.velocity.y == speed)
                {
                   pinkGhost.body.velocity.y = 0;
                   pinkGhost.body.velocity.x = -speed;
                }
                if (pinkGhost.x < 235  && pinkGhost.body.velocity.x == -speed)
                {
                   pinkGhost.body.velocity.x = 0;
                   pinkGhost.body.velocity.y = -speed;
                }
                     
                if (pinkGhost.y < 30 && pinkGhost.body.velocity.y == -speed)
                {
                   pinkGhost.body.velocity.y = 0;
                   pinkGhost.body.velocity.x = speed;
                }
                if(pinkGhost.x > 563 && pinkGhost.body.velocity.x == speed)
                {
                   pinkGhost.body.velocity.x = 0;
                   pinkGhost.body.velocity.y = speed;
                }
                
                //CyanGhost Movment!
                if (cyanGhost.y > 505 && cyanGhost.body.velocity.y == speed)
                {
                   cyanGhost.body.velocity.y = 0;
                   cyanGhost.body.velocity.x = speed;
                }
                if (cyanGhost.x > 563  && cyanGhost.body.velocity.x == speed)
                {
                   cyanGhost.body.velocity.x = 0;
                   cyanGhost.body.velocity.y = -speed;
                }
                     
                if (cyanGhost.y < 30 && cyanGhost.body.velocity.y == -speed)
                {
                   cyanGhost.body.velocity.y = 0;
                   cyanGhost.body.velocity.x = -speed;
                }
                if(cyanGhost.x < 235 && cyanGhost.body.velocity.x == -speed)
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
                if (yellowGhost.x > 765  && yellowGhost.body.velocity.x == speed)
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
                if (limeGhost.x < 33  && limeGhost.body.velocity.x == -speed)
                {
                   limeGhost.body.velocity.x = 0;
                   limeGhost.body.velocity.y = -speed;
                }
                     
                if (limeGhost.y < 30 && limeGhost.body.velocity.y == -speed)
                {
                   limeGhost.body.velocity.y = 0;
                   limeGhost.body.velocity.x = speed;
                }
                if(limeGhost.x > 765 && limeGhost.body.velocity.x == speed)
                {
                   limeGhost.body.velocity.x = 0;
                   limeGhost.body.velocity.y = speed;
                }
            }
            
        function timerfunction()
        {
            counterTag = document.getElementById('counterTag');
            timer++;
            counterTag.innerHTML = "Time:" + timer + "      Life:" + pacmanLife;
        }
})();