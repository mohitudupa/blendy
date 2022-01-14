PALLETES = colors.colorsMuzLi;
DENSITY = 256;
SIZE = 15;
INCERMENT = 0.01;


function randInt(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}


function clear(pallete) {
    document.getElementById('canvas').innerHTML = '';
    document.getElementById('canvas').style.backgroundColor = pallete[randInt(0, pallete.length)];
}


function getLines(pallete) {
    noise.seed(Math.random());

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let count = Math.floor(windowHeight * windowWidth / DENSITY);
    let lines = [];

    for(let i = 0; i < count; i++) {
        let x = randInt(-SIZE, windowWidth + SIZE);
        let y = randInt(-SIZE, windowHeight + SIZE);

        let xOff = x / SIZE * INCERMENT;
        let yOff = y / SIZE * INCERMENT;

        let angle = (noise.simplex2(xOff, yOff) + 1) * 180; 
        let vec = vector.newSpherical(SIZE * 3, angle);

        lines.push({
            x1: x,
            y1: y,
            x2: x + vec.x,
            y2: y + vec.y,

            fill: pallete[randInt(0, pallete.length)],
            opacity: randInt(0, 10),
        });
    }

    return lines;
}


function draw(lines) {
    let content = '';

    for(let line of lines) {
        content += `<path d="M ${line.x1}, ${line.y1} L ${line.x2}, ${line.y2}" stroke="${line.fill}" stroke-width="${SIZE}"></path>`
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

    lines = getLines(pallete);

    clear(pallete);

    draw(lines);

    frame(pallete);
}


generate();
