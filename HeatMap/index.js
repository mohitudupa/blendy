PALLETES = colors.colorsMuzLi;
SIZE = 12;
INCERMENT = 0.075;


function randInt(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}


function clear(pallete) {
    document.getElementById('canvas').innerHTML = '';
    document.getElementById('canvas').style.backgroundColor = pallete[randInt(0, pallete.length)];
}


function getTiles(pallete) {
    noise.seed(Math.random());

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let tiles = [];

    for(let j = 0; j < windowHeight / SIZE; j++) {
        for(let i = 0; i < windowWidth / SIZE; i++) {
            let n = noise.simplex2(i * INCERMENT, j * INCERMENT) + 1;
            let colorIndex = Math.floor(n / 2 * pallete.length)
            tiles.push({
                x: i * SIZE,
                y: j * SIZE,
                fill: pallete[colorIndex],
            })
        }
    }

    return tiles;
}


function draw(lines) {
    let content = '';

    for(let line of lines) {
        content += `<rect x="${line.x}" y="${line.y}" width="${SIZE}" height="${SIZE}" fill="${line.fill}"></rect>`
    }

    document.getElementById('canvas').innerHTML = content;
}

function frame(pallete) {
    let content = `<path d="M 0, 0 L ${window.innerWidth}, 0 L ${window.innerWidth}, ${window.innerHeight} L 0, ${window.innerHeight} L 0, 0"
                    stroke="${pallete[0]}" stroke-width="${SIZE * 2}" fill="transparent"></path>`
    document.getElementById('canvas').innerHTML += content;
}


function generate() {
    let pallete = PALLETES[randInt(0, PALLETES.length)]

    tiles = getTiles(pallete);

    clear(pallete);

    draw(tiles);

    frame(pallete);
}


generate();
