import { Animation, LoadImage, LoadAudio, Shape, Text, World, GameLoop } from 'life.min.js';

const assets = {
    images: {
        paper: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/21/newspaper_1f4f0.png",
        scissor: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/81/black-scissors_2702.png",
        rock: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/271/rock_1faa8.png",
        bg: "https://www.kindpng.com/picc/m/38-382638_transparent-polka-dot-background-png-transparent-square-dots.png"
    }
}

for (const image in assets.images) {
    assets.images[image] = await LoadImage(assets.images[image]);
}

function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const world = new World({
    G: { x: 0, y: 0 },
    hasLimits: true,
    pattern: "image",
    background: {
        image: assets.images.bg
    },
    border: {
        pattern: 'color',
        background: 'transparent',
        width: 1
    },
    responsive: true,
    createWorld: true,
    border: {
        width: 3,
        pattern: 'color',
        background: 'black',
    }
});

let SIZE = world.width < 728 ? 20 : 38;

function generateShape(type) {
    let image = assets.images[type];

    var my = new Shape({
        pattern: 'image',
        background: {
            image
        },

        width: SIZE,
        height: SIZE,

        tag: 'robot',

        x: randint(0, world.width - 40),
        y: randint(0, world.height - 40),

        name: type
    })

    my.on('collision', (other) => {

        switch (my.name) {
            case "scissor":
                switch (other.name) {
                    case "paper":
                        other.name = "scissor";
                        other.background.image = assets.images.scissor
                        break;
                    case "rock":
                        other.name = "rock";
                        other.background.image = assets.images.rock
                        break;
                }
                break;
            case 'rock':
                switch (other.name) {
                    case "paper":
                        other.name = "paper";
                        other.background.image = assets.images.paper
                        break;
                    case "scissor":
                        other.name = "rock";
                        other.background.image = assets.images.rock
                        break;
                }
                break;
            case "paper":
                switch (other.name) {
                    case "rock":
                        other.name = "paper";
                        other.background.image = assets.images.paper
                        break;
                }
        }
    })

    return my;

}

setInterval(() => {

    const step = world.width / 200
    world.Objects.forEach(shape => {
        if (shape.tag === "robot") {
            shape.moving = {
                x: Math.random() < .5 ? -step : step,
                y: Math.random() < .5 ? -step : step,
            }
        }
    })
}, 1000);

for (var i = 0; i < world.width / 50; i++) {
    generateShape("rock");
    generateShape("paper");
    generateShape("scissor");
}

function main() {
    world.update();

    let types = []
    world.Objects.forEach(shape => {
        if (shape.moving) {
            shape.x += shape.moving.x
            shape.y += shape.moving.y
        }

        if (shape.isOutOfMap()) {
            shape.x = randint(0, world.width - 40);
            shape.y = randint(0, world.height - 40);
        }

        ["rock", "paper", "scissor"].includes(shape.name) && types.push(shape.name);
    })

    function win(n) { alert(n + ' Wins!'); location.reload(); game.stop(); }

    if (types.every(type => type === 'scissor')) win('Scissor')
    if (types.every(type => type === 'paper')) win('Paper')
    if (types.every(type => type === 'rock')) win('Rock')
}

const FPS = 120;
let game = new GameLoop(main, FPS);
game.start();

window.world = world