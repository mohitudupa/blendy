const PALLETES = colors.colorsMuzLi;
const BORDER = 16;
const ROWS = 100;
const SPACING = 20;
const HINCERMENT = 0.025;
const VINCERMENT = 0.005;
const FRAMERATE = 60;


function randInt(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}

function draw() {
    // Draw SVG
}

function setup(pallete) {
    // Clear SVG
    document.getElementById('canvas').innerHTML = '';

    // Setup background
    document.getElementById('canvas').style.backgroundColor = pallete[randInt(0, pallete.length)];

    // Create paths

    // Create frame
    let content = `<path d="M 0, 0 L ${window.innerWidth}, 0 L ${window.innerWidth}, ${window.innerHeight} L 0, ${window.innerHeight} L 0, 0"
                    stroke="${pallete[0]}" stroke-width="${BORDER}" fill="transparent"></path>`
    document.getElementById('canvas').innerHTML += content;
}

function generate() {
    let pallete = PALLETES[11]; // randInt(0, PALLETES.length)
    let columns = window.innerWidth / SPACING + 1;

    setup(pallete);

    draw();
}


generate();
