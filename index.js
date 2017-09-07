var canvas,
    stage,
    shipImg = new Image(),
    ship,
    live = new createjs.Container(),
    liveCount = new createjs.Container(),
    liveImg = new Image(),
    bulletImg = new Image(),
    bulletInvaImg = new Image(),
    bulletBossImg = new Image(),
    bullets = new createjs.Container(),
    bulletsInva = new createjs.Container(),
    bulletsBoss = new createjs.Container(),
    invaderImg = new Image(),
    invaders = new createjs.Container(),
    invaPop = true,
    bossImg = new Image(),
    boss,
    loseImg = new Image(),
    liveCountBip,
    shootBoss = false,
    bossLive = 20,
    preload = 0,
    centerX = 400,
    TextForScore,
    score = 0,
    lives = 5,
    livesText,
    right,
    left,
    space,
    bossMoves = 1;


function init() {
    // creation du stage
    canvas = document.getElementById('game');
    stage = new createjs.Stage(canvas);

    // preload des images

    // vaisseau
    shipImg.src = 'img/ship.png';
    shipImg.name = 'ship';
    shipImg.onload = preloader;

    // live
    liveImg.src = 'img/live.png';
    liveImg.name = 'live';
    liveImg.onload = preloader;

    // invaders
    invaderImg.src = 'img/invader.png';
    invaderImg.name = 'invader';
    invaderImg.onload = preloader;

    // Boss
    bossImg.src = 'img/boss.png';
    bossImg.name = 'boss';
    bossImg.onload = preloader;

    // fin du jeu
    loseImg.src = 'img/lose.png';
    loseImg.name = 'lose';
    loseImg.onload = preloader;

    // balle vaisseau
    bulletImg.src = 'img/bullet.png';
    bulletImg.name = 'bullet';
    bulletImg.onload = preloader;

    // balle invaders
    bulletInvaImg.src = 'img/bulletInva.png';
    bulletInvaImg.name = 'bulletInva';
    bulletInvaImg.onload = preloader;

    // balle Boss
    bulletBossImg.src = 'img/bulletBoss.png';
    bulletBossImg.name = 'bullet';
    bulletBossImg.onload = preloader;

}

function preloader(e)
{
    // instantiation du vaisseau
    if (e.target.name == 'ship') {
        ship = new createjs.Bitmap(shipImg);
    }

    preload++;

    // tant que tout les images ne sont pas load on ne charge pas le jeu
    if (preload == 8) {
        addGameView();
    }
}


function addGameView() {

    // positionnement du vaisseau
    ship.x = centerX - 31;
    ship.y = 650;

    // ajout du TextForScore
    TextForScore = new createjs.Text('0', 'bold 30px Courier New', '#FFFFFF');
    TextForScore.maxWidth = 1000;
    TextForScore.x = 2;
    TextForScore.y = 476;
    for (var i = 0; i < lives; i++) {
        liveCountBip = new createjs.Bitmap(liveImg);
        liveCount.addChild(liveCountBip);

    };

    // ajout au stage des image
    stage.addChild(ship, bullets, live, liveCount, bulletsInva, bulletsBoss, invaders, TextForScore);
    stage.update();

    // appel playGame après chargement des textes
    setTimeout(playGame, 1000);
}

// fonction de tir
function shoot(from, positionX, positionY) {


    if (from == ship) {
        // tir vaisseau
        var b = new createjs.Bitmap(bulletImg);
        b.x = ship.x + 29;
        b.y = ship.y;
        bullets.addChild(b);

    } else if (from == invaders) {
        // tir invaders
        var bI = new createjs.Bitmap(bulletInvaImg);
        bI.x = positionX + 30;
        bI.y = positionY + 10;
        bulletsInva.addChild(bI);

    } else if (from == boss){

        if (shootBoss == true) {
            // tir boss (2 tirs en même temps)
            var bB1 = new createjs.Bitmap(bulletBossImg);
            bB1.x = positionX + 85;
            bB1.y = positionY + 150;
            bulletsBoss.addChild(bB1);

            var bB2 = new createjs.Bitmap(bulletBossImg);
            bB2.x = positionX + 170;
            bB2.y = positionY + 150;
            bulletsBoss.addChild(bB2);
        }
    }

    stage.update();
}

// fonction pour les différentes formation
function formation(numFomr) {

    if (numFomr == 0) {
        // formation par 3
        var invader1 = new createjs.Bitmap(invaderImg);
        invader1.x = Math.floor(Math.random() * (650 - 74) + 74 );
        invader1.y = - 45;
        invaders.addChild(invader1);

        var invader2 = new createjs.Bitmap(invaderImg);
        invader2.x = invader1.x - 101;
        invader2.y = invader1.y - 74;
        invaders.addChild(invader2);

        var invader3 = new createjs.Bitmap(invaderImg);
        invader3.x = invader1.x + 101;
        invader3.y = invader1.y - 74;
        invaders.addChild(invader3);

    } else if (numFomr == 1) {
        // formation par 5
        var invader4 = new createjs.Bitmap(invaderImg);
        invader4.x = Math.floor(Math.random() * (725 - 222) + 222 );
        invader4.y = -45;
        invaders.addChild(invader4);

        var invader5 = new createjs.Bitmap(invaderImg);
        invader5.x = invader4.x - 101;
        invader5.y = invader4.y - 74;
        invaders.addChild(invader5);

        var invader6 = new createjs.Bitmap(invaderImg);
        invader6.x = invader4.x;
        invader6.y = invader4.y - 148;
        invaders.addChild(invader6);

        var invader7 = new createjs.Bitmap(invaderImg);
        invader7.x = invader4.x - 202;
        invader7.y = invader4.y - 148;
        invaders.addChild(invader7);

        var invader8 = new createjs.Bitmap(invaderImg);
        invader8.x = invader4.x - 202;
        invader8.y = invader4.y;
        invaders.addChild(invader8);

    } else if (numFomr == 2) {
        var invader9 = new createjs.Bitmap(invaderImg);
        invader9.x = Math.floor(Math.random() * (440 - 20) + 20);
        invader9.y = -45;
        invaders.addChild(invader9);

        var invader10 = new createjs.Bitmap(invaderImg);
        invader10.x = invader9.x + 101;
        invader10.y = invader9.y;
        invaders.addChild(invader10);

        var invader11 = new createjs.Bitmap(invaderImg);
        invader11.x = invader9.x + 202;
        invader11.y = invader9.y;
        invaders.addChild(invader11);

        var invader12 = new createjs.Bitmap(invaderImg);
        invader12.x = invader9.x + 303;
        invader12.y = invader9.y;
        invaders.addChild(invader12);
    }
}

// ajout des invaders
function addEnemy() {
    if (invaPop == true) {
        numFomr = Math.floor(Math.random() * (3));
        formation(numFomr);
        stage.update();
    }
}

// ajout des vie
function addLive() {
    var li = new createjs.Bitmap(liveImg);
    li.x = Math.floor(Math.random() * (650 - 30) + 30 );
    li.y = -45;
    console.log()
    live.addChild(li);
}

var lastFire = 0;


// déplacement du vaiseau et tir
function moveShip() {
    var d = Date.now();

    if (left == true) {
        if (ship.x >= 9) {
            ship.x -= 15;
        } else {
            ship.x = 0;
        }
    }
    if (right == true) {
        if (ship.x <= 736) {
            ship.x += 15;
        } else {
            ship.x = 738;
        }
    }
    if (space == true && d - lastFire > 300) {
        // cadence de tir tout les 300
        lastFire = d;
        shoot(ship, 0);
        space = false;
    }
    ship.x
    stage.update();
}
var lastFireInva = 0;
var liveTime = 30;
var PopInvaTime = 10;

function update() {

    var d = Date.now();
    if (liveTime < 0) {
        liveTime = Math.floor(Math.random() * 300 + 450 );
        addLive();
    } else{
        liveTime--;
    }

    if (PopInvaTime < 0) {
        PopInvaTime = Math.floor(Math.random() * 20 + 50);
        console.log(PopInvaTime);
        addEnemy();
    } else{
        PopInvaTime--;
    }
    // boucle pour les balles du vaisseau
    for(var i = 0; i < bullets.children.length; i++) {
        // incrementation de 10 pour le déplacement des balles
        bullets.children[i].y -= 10;
        // suppression des balles
        if (bullets.children[i].y < - 20) {
            bullets.removeChildAt(i);
        }
        // decrementation de la vie du boss, ajout des points et suppression des balles si elle le touche
        if (boss && bullets.children[i].x >= boss.x && bullets.children[i].x + 4 < boss.x + 256 && bullets.children[i].y < boss.y + 200) {
            TextForScore.text = parseInt(TextForScore.text + 50);
            score += 50;
            bullets.removeChildAt(i);
            bossLive--;
            stage.update();
        }
    }

    // boucle pour les vie
    for(var q = 0; q < live.children.length; q++) {
        // incrementation de 10 pour le déplacement des vies
        live.children[q].y += 10;

        // suppression des vies
        if (live.children[q].y && live.children[q].y > 710) {
            live.removeChildAt(q);
        }
        // ajout des vie attrapé
        //if (live.children[q].x >= ship.x - 40 && live.children[q].x <= ship.x + 62 && live.children[q].y + 27 > ship.y) {
          if (ship.x < live.children[q].x + 40 && ship.x + 62 > live.children[q].x && live.children[q].y + 27 > ship.y) {
            live.removeChildAt(q);
            lives++;
            liveCountBip = new createjs.Bitmap(liveImg);
            liveCountBip.y = 40 * (lives - 1);
            liveCount.addChild(liveCountBip);
            stage.update();
        }
    }

    // boucle pour les balles du boss
    for(var l = 0; l < bulletsBoss.children.length; l++) {
        bulletsBoss.children[l].y += 15;

        // colision entre les balles du boss et le vaisseau suppression des balles décrementation des vie
        if (bulletsBoss.children[l].x >= ship.x && bulletsBoss.children[l].x <= ship.x + 62 && bulletsBoss.children[l].y + 11 > ship.y) {
            bulletsBoss.removeChildAt(l);
            lives--;
            liveCount.removeChildAt(lives);
            stage.update();
        }

        // suppression des balles du boss
        if (bulletsBoss.children[l].y && bulletsBoss.children[l].y > 710) {
            bulletsBoss.removeChildAt(l);
        }
    }

    // boucle pour les balles des invaders
    for(var m = 0; m < bulletsInva.children.length; m++) {

        bulletsInva.children[m].y += 15;

        // colision balles invaders vaisseau
        if (bulletsInva.children[m].x >= ship.x && bulletsInva.children[m].x <= ship.x + 62 && bulletsInva.children[m].y + 11 > ship.y) {
            bulletsInva.removeChildAt(m);
            lives--;
            liveCount.removeChildAt(lives);
            stage.update();
        }

        // suppression des balles
        if (bulletsInva.children[m].y && bulletsInva.children[m].y > 710) {
            bulletsInva.removeChildAt(m);
        }
    }
    // boucle pour le déplacement des invaders
    for(var j = 0; j < invaders.children.length; j++) {
        invaders.children[j].y += 5;

        // tirage random de l'invaders qui tir
        var invaShouter = Math.floor(Math.random() * (j));

        // tir des invaders tout les 800
        if (invaShouter && d - lastFireInva > 800) {
            shoot(invaders, invaders.children[invaShouter].x, invaders.children[invaShouter].y);
            lastFireInva = d;
        }

        // supression des invaders
        if (invaders.children[j].y > 700) {
            TextForScore.text = parseFloat(TextForScore.text - 50);
            score -= 50;
            invaders.removeChildAt(j);
            stage.update();
        }

        // boucle pour les les balles qui touche les invaders
        for(var k = 0; k < bullets.children.length; k++) {

            if (bullets.children[k].x >= invaders.children[j].x && bullets.children[k].x + 4 < invaders.children[j].x + 60 && bullets.children[k].y < invaders.children[j].y + 20) {
                TextForScore.text = parseFloat(TextForScore.text + 15);
                score += 15;
                bullets.removeChildAt(k);
                invaders.removeChildAt(j);
                stage.update();
            }
        }
    }

    // ajout du boss
    if (score >= 400 && boss == null) {

        shootBoss = true;
        boss = new createjs.Bitmap(bossImg);
        boss.x = 160;
        boss.y = 15;
        stage.addChild(boss);

        invaPop = false;
    }

    // déplacement du boss
    if (boss) {
        if(boss.x < 0) {
            bossMoves *= -1;
        } else if (boss.x > 544){
            bossMoves *= -1;
        }

        boss.x += (10 * bossMoves);
        // tir du boss tout les 800
        if (d - lastFireInva > 800) {
            shoot(boss, boss.x, boss.y);
            lastFireInva = d;
        }
    }

    // mort du boss
    if(bossLive <= 0) {
        invaPop = true;
        shootBoss = false;
        stage.removeChild(boss);
    }

    // mort du joueur
    if (lives <= 0) {
        lose = new createjs.Bitmap(loseImg);
        stage.addChild(lose);
        stage.removeChild(invaders, ship, boss);
        loseFunc();
    }
}
function loseFunc() {
    document.addEventListener('click', function(e) {
        window.location.reload();
    });
}

function playGame() {

    // boucle pour les mouvements du vaisseau
    createjs.Ticker.addEventListener("tick", moveShip);

    // differentition de l'affichage et du déplacement du vaiseau

    // evenement sur le keydown de la touche
    document.addEventListener('keydown', function(e) {
        if(e.keyCode == 37) {
            left = true;
        }
        if(e.keyCode == 39)  {
            right = true;
        }
        if(e.keyCode == 32)  {
            space = true;
        }
    });

    // evenement sur le keyup
    document.addEventListener('keyup', function(e) {
        if(e.keyCode == 37) {
            left = false;
        }
        if(e.keyCode == 39)  {
            right = false;
        }
        if(e.keyCode == 32)  {
            space = false;
        }
    });

    var posX = 0;
    for (var i = 0; i < liveCount.children.length; i++) {
        liveCount.children[i].y = posX;
        posX += 40;

    };

    // boucle sur pour update l'affiche, les points les balles...
    createjs.Ticker.addEventListener("tick", update);

}

window.addEventListener('DOMContentLoaded', init);

