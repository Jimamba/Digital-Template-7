window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
        game.load.spritesheet('player','assets/ambulance.png',20,12);
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('patients','assets/patient.png');
        game.load.image('win','assets/Winner.png');
        game.load.audio('thwack','assets/Thwack.mp3');
        game.load.audio('music','assets/Sono Chi No Sadame.wav');
    }
    
    
    var player;
    var patients;
    var platforms;
    var cursors;
    var patients;
    var score = 0;
    var scoret;
    var win;
    var thwack;
    var music;
    
    function create() 
    {
      	game.physics.startSystem(Phaser.Physics.ARCADE);
      	thwack = game.add.audio('thwack',1,true);
      	music = game.add.audio('music');
      	music.play();
     	game.add.sprite(0,0,'sky');
     	platforms = game.add.group();
     	platforms.enableBody = true;
     	var ground = platforms.create(0, game.world.height - 64, 'ground');
     	ground.scale.setTo(2,2);
     	ground.body.immovable = true;
        player = game.add.sprite(400, game.world.height - 76, 'player' );
        game.physics.enable( player, Phaser.Physics.ARCADE );
        player.body.collideWorldBounds = true;
        cursors = game.input.keyboard.createCursorKeys();
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        scoret = game.add.text(0,0, 'Score: 0',{ fontSize: '30px', fill: '#000'});
        patients = game.add.group();
 
    	patients.enableBody = true;
 		
       
        var patient = patients.create(65, 0, 'patients');
 		patient.body.collideWorldBounds = true;
        
        patient.body.gravity.y = 100;
 
        if(score >= 100)
    	{
    	game.paused = true;
    	music.stop();
    	game.add.sprite(0,0,'win');
    	}
    	
    }
    
    function update() 
    {
    	game.physics.arcade.collide(player,platforms);
    	//game.physics.arcade.collide(patients,platforms);
    	game.physics.arcade.overlap(player, patients, collect, null, this);
    	game.physics.arcade.overlap(patients, platforms, drop, null, this);
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        player.body.velocity.x = 0;
       if (cursors.left.isDown)
    	{
        //  Move to the left
        player.body.velocity.x = -350;
 		player.frame = 0;
        
   		}
    	else if (cursors.right.isDown)
    	{
        //  Move to the right
        player.body.velocity.x = 350;
 		player.frame = 1;
        
    	}
    	if(score >= 100)
    	{
    	game.paused = true;
    	music.stop();
    	game.add.sprite(0,0,'win');
    	}
    }
    //collect function
    function collect(player,patient)
    {
    patient.kill();
    
    score = score + 10;
    scoret.text = 'Score: ' + score;
    var patient = patients.create(30 + Math.random() * 650, 0, 'patients');
    patient.body.collideWorldBounds = true;
    patient.body.gravity.y = 80;
 	var patient = patients.create(30 + Math.random() * 650, 0, 'patients');
    patient.body.collideWorldBounds = true;
    patient.body.gravity.y = 70;
    }
    function drop(patient,ground)
    {
    score = score - 3;
    thwack.play('',0,1,false);
    patient.kill();
    var patient = patients.create(30 + Math.random() * 650, 0, 'patients');
    patient.body.collideWorldBounds = true;
    patient.body.gravity.y = 70;
    }
};
