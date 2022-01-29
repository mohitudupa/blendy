const PALLETES = colors.colorsMuzLi;
const BORDER = 16;
const CIRCLES = 64;
const SHARDS = 16;
const RESOLUTION = 1;


function randInt(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}

function arc(centerX, centerY, radius, startAngle, endAnge) {
    vecStart = vector.newSpherical(radius, startAngle);
    vecEnd = vector.newSpherical(radius, endAnge);
    return `M ${centerX + vecStart.x} ${centerY + vecStart.y} A ${centerX} ${centerY} 0 0 1 ${centerX + vecEnd.x} ${centerY + vecEnd.y}`
    
}

function getArcEnd(arcStart, radius, radius_increment) {
    return arcStart + randInt(8, 16) * Math.max(radius, radius_increment * CIRCLES / 2) / max_radius / 2;
}


function draw(pallete) {
    // Draw SVG
    // Pick a center
    centerX = window.innerWidth / 2; // [randInt(0, window.innerWidth), randInt(0, window.innerHeight)]
    centerY = window.innerHeight / 2
    max_radius = Math.max(centerX, centerY) * 1.2;
    radius_increment = max_radius / CIRCLES;

    // Create concentric circles
    let content = '';
    radius = max_radius;
    paths = []
    for (let i = 0; i < CIRCLES; i++) {
        radius -= radius_increment;
        content += `<circle cx="${centerX}" cy="${centerY}" r="${radius}"
            fill="${pallete[randInt(0, pallete.length)]}"/>`

        // Skip drawing arcs for the 10 inner circles
        if (CIRCLES - i < 10){
            continue;
        }

        for (let _ = 0; _ < SHARDS; _++){
            arcStart = randInt(0, 360);
            arcEnd = getArcEnd(arcStart, radius, radius_increment);
            d = arc(centerX, centerY, radius, arcStart, arcEnd)
            content += `<path d="${d}" stroke="${pallete[randInt(0, pallete.length)]}" 
                        stroke-width="${radius_increment * randInt(1, 3)}"
                        fill="transparent" stroke-linecap="butt"></path>`
        }
    
    }
    

    // Create frame
    content += `<path d="M 0, 0 L ${window.innerWidth}, 0 L ${window.innerWidth}, ${window.innerHeight} L 0, ${window.innerHeight} L 0, 0"
                    stroke="${pallete[0]}" stroke-width="${BORDER}" fill="transparent"></path>`
    document.getElementById('canvas').innerHTML += content;

}

function setup(pallete) {
    // Clear SVG
    document.getElementById('canvas').innerHTML = '';

    // Setup background
    document.getElementById('canvas').style.backgroundColor = pallete[randInt(0, pallete.length)];
}

function generate() {
    let pallete = PALLETES[11]; // PALLETES[randInt(0, PALLETES.length)];

    setup(pallete);

    draw(pallete);
}


generate();
