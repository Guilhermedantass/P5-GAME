let tela = "menu";
let submenu = "principal"
let bg, menu, audio, move, som, volume, hero;
move = 1200;


function preload() {
    loadImages();
    loadSounds();
}

function loadImages() {
    bg = loadImage('images/bg.svg');
    nuvem = loadImage('images/nuvem.svg');
    menu = loadImage('images/menu.svg');
    som = loadImage('images/som.svg');
    start = loadImage('images/start.svg');
    score = loadImage('images/score.svg');
    options = loadImage('images/options.svg');
    about = loadImage('images/about.svg');
    guilherme = loadImage('images/guilherme.jpeg');
}

function loadSounds() {
    audio = loadSound('music/menu.mp3');
}

function setup() {
    createCanvas(1200, 600);
    // audio.setVolume(0.1)
    // audio.play();
    criarHero();

}

function draw() {
    image(bg, 0, 0);
    image(nuvem, move, 0);
    moveNuvem()
    console.log(submenu);

    if (tela === "menu") {
        hero.x = -100
        hero.y = -465
        image(nuvem, move, 0);

        fill('rgba(0, 0, 0,0.5)');
        rect(0, 0, width, height);

        image(som, 1145, 5);
        image(menu, 0, 0);

        if (submenu == "principal") {
            image(start, 500, 190);
            image(score, 500, 250);
            image(options, 500, 310);
            image(about, 500, 370);

        }
        if (submenu == "options") {
            let mensagem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
            mollit anim id est laborum.`

            textSize(32);
            fill(0, 0, 0);
            text('INSTRUÇÕES', 500, 180, 50, 1000);
            textSize(14);
            text(mensagem, 480, 230, 270);

        }
        if (submenu == "about") {
            textSize(30);
            fill(0, 0, 0);
            text('Colaboradores', 500, 190, );
            image(guilherme, 550, 250, 106, 98)
            textSize(20);
            fill(0, 0, 0);
            text('Elison Guilherme', 530, 370, );
            textSize(16);
            fill(0, 0, 0);
            text('Desenvolvedor', 550, 380, 50, 100);
        }

        text(mouseX + ' ' + mouseY, 20, 20)
        coverButtom()
    } else if (tela == 'jogar') {

        hero.scale = 2;
        if (kb.pressing('left')) {
            hero.changeAni('run');
            hero.vel.x = -2;
            hero.mirror.x = true;
        } else if (kb.pressing('right')) {
            hero.changeAni('run');
            hero.vel.x = 2;
            hero.mirror.x = false;
        } else if (kb.pressing('q')) {
            hero.changeAni('atk');
        } else if (kb.pressing('w')) {
            hero.changeAni('atk2');
        } else if (keyCode == 27) {
            tela == "menu";
        } else {
            hero.changeAni('stop');
            hero.vel.x = 0;
            hero.vel.y = 0;
        }

    }
}

function keyPressed() {
    if (keyCode == 27) {
        if (tela == "jogar") {
            tela = "menu";
        } else if (tela == "menu") {
            submenu = "principal"
        }
    }

}

function mousePressed() {
    if (tela == 'menu') {
        switch (true) {
            case (mouseX >= 538 && mouseX <= 662 && mouseY >= 190 && mouseY <= 230):
                noCursor();
                hero.x = 100
                hero.y = 465
                tela = 'jogar'
                break;
            case (mouseX >= 1145 && mouseX <= 1195 && mouseY >= 5 && mouseY <= 55):
                mudarVolume();
                break;
            case (mouseX >= 508 && mouseX <= 692 && mouseY >= 310 && mouseY <= 350):
                submenu = "options";
                break;
            case (mouseX >= 508 && mouseX <= 692 && mouseY >= 370 && mouseY <= 410):
                submenu = "about";
                console.log("aqio")
                break;
        }
    } else if (tela == 'jogar') {
        hero.changeAni('atk');
    }
}

function mudarVolume() {
    if (volume != 0) {
        audio.setVolume(0.0);
        volume = 0;
    } else {
        audio.setVolume(0.4);
        volume = 1;
    }
}

function moveNuvem() {
    if (move > -1200) {
        move = move - 0.7;
    } else {
        move = 1200;
    }
}

function coverButtom() {
    if (tela == "menu") {
        if (mouseX >= 538 && mouseX <= 662 && mouseY >= 190 && mouseY <= 230 ||
            mouseX >= 508 && mouseX <= 692 && mouseY >= 250 && mouseY <= 290 ||
            mouseX >= 508 && mouseX <= 692 && mouseY >= 310 && mouseY <= 350 ||
            mouseX >= 508 && mouseX <= 692 && mouseY >= 370 && mouseY <= 410 ||
            mouseX >= 1145 && mouseX <= 1195 && mouseY >= 5 && mouseY <= 55
        ) {
            cursor('pointer');
        } else(
            cursor('default')
        )
    }
}

function criarHero() {
    hero = new Sprite(-100, -465, 100, 55);
    hero.spriteSheet = 'images/Hero.png';
    hero.frameRate = 10;
    hero.anis.offset.x = 10;
    hero.anis.frameDelay = 10;
    hero.addAnis({
        stop: { row: 0, frames: 8 },
        run: { row: 1, frames: 8 },
        atk: { row: 2, frames: 8 },
        atk2: { row: 3, frames: 8 }

    });
    hero.changeAni('stop');
}