const PALLETES = colors.colors;
const BORDER = 16;
const ROWS = 64;
const SPACING = 32;
const HINCERMENT = 0.025;
const VINCERMENT = 0.005;
const FRAMERATE = 30;


let interval = null;


function randInt(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}

function draw(lines) {
    let paths = document.getElementsByTagName('path');
    for(let i in lines) {
        line = lines[i];
        x = 0;
        y = window.innerHeight / 2 - parseInt(i) + lines.length / 2;

        let d = `M ${x}, ${y} `;
        for(let j in line){
            ly = line[j] + y;
            lx = j * SPACING + x;
            d += `L ${lx}, ${ly} `;
        }
        paths[i].setAttribute('d', d);
    }
}

function setup(pallete, rows) {
    // Clear SVG
    document.getElementById('canvas').innerHTML = '';

    // Setup background
    document.getElementById('canvas').style.backgroundColor = pallete[randInt(0, pallete.length)];

    // Create paths
    for(let i = 0; i < rows; i++) {
        let path = document.createElement('path');
        path.setAttribute('stroke-width', 2);
        path.setAttribute('stroke', pallete[randInt(0, pallete.length)]);
        path.setAttribute('stroke-opacity', (rows - i) / rows + 0.3)
        path.setAttribute('fill', 'transparent');
        // path.setAttribute('opacity', 0.01);
        document.getElementById('canvas').appendChild(path);
    }

    // Create frame
    let content = `<path d="M 0, 0 L ${window.innerWidth}, 0 L ${window.innerWidth}, ${window.innerHeight} L 0, ${window.innerHeight} L 0, 0"
                    stroke="${pallete[0]}" stroke-width="${BORDER}" fill="transparent"></path>`
    document.getElementById('canvas').innerHTML += content;
}

function generate() {
    if(interval) {
        clearInterval(interval);
    }

    let pallete = PALLETES[randInt(0, PALLETES.length)]; // 11
    let columns = window.innerWidth / SPACING + 1;
    let waves = new WaveForm(ROWS, columns, HINCERMENT, VINCERMENT, Math.random());

    lines = waves.render(window.innerHeight / 3);

    setup(pallete, ROWS);

    draw(lines);

    if(FRAMERATE > 0) {
        interval = setInterval(step, 1000 / FRAMERATE, waves);
    }
}


function step(waves) {
    waves.step();
    let lines = waves.render(window.innerHeight / 3);

    draw(lines);
}


let waves = generate();



