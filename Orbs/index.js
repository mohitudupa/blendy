const PALLETES = colors.colorsMuzLi;
const BORDER = 16;
const ORBS = 32;
const MIN_RADIUS = 32;
const MAX_RADIUS = 192;
const RESOLUTION_FACTOR = 2;
const FRAMERATE = 30;


let interval = null;


function randInt(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}

function draw(orbs) {
    // Draw SVG
    let paths = document.getElementsByTagName('path');
    for(let i in orbs) {
        let orb = orbs[i];

        let d = '';
        for(let point of orb) {
            d += `L ${point[0]}, ${point[1]} `;
        }
        d = d.replace('L', 'M')
        paths[i].setAttribute('d', d);
    }
}

function setup(pallete) {
    // Clear SVG
    document.getElementById('canvas').innerHTML = '';

    // Setup background
    let background = pallete.pop(pallete[randInt(0, pallete.length)]);
    document.getElementById('canvas').style.backgroundColor = background;

    // Create paths
    for(let i = 0; i < ORBS; i++) {
        let color = pallete[randInt(0, pallete.length)];
        let path = document.createElement('path');
        path.setAttribute('stroke-width', 2);
        path.setAttribute('stroke', color);
        path.setAttribute('fill', color);
        path.setAttribute('opacity', 0.75 + i / ORBS / 2);
        document.getElementById('canvas').appendChild(path);
    }

    // Create frame
    let content = `<path d="M 0, 0 L ${window.innerWidth}, 0 L ${window.innerWidth}, ${window.innerHeight} L 0, ${window.innerHeight} L 0, 0"
                    stroke="${pallete[0]}" stroke-width="${BORDER}" fill="transparent"></path>`
    document.getElementById('canvas').innerHTML += content;
}


function generate() {
    let height = window.innerHeight;
    let width = window.innerWidth;

    if(interval) {
        clearInterval(interval);
    }

    let pallete = JSON.parse(JSON.stringify(PALLETES[randInt(0, PALLETES.length)]));

    let orbs = [];
    for(let i = 0; i < ORBS; i++) {
        let radius = randInt(MIN_RADIUS, MAX_RADIUS);
        orbs.push(new Orb(
            randInt(0, width), 
            randInt(0, height), 
            radius, 
            0, 
            radius * RESOLUTION_FACTOR)
        )
    }

    setup(pallete);

    draw(orbs.map((orb) => orb.step()));

    if(FRAMERATE > 0) {
        interval = setInterval(step, 1000 / FRAMERATE, orbs);
    }
}


function step(orbs) {
    draw(orbs.map((orb) => orb.step()));
}


generate();
