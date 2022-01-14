PALLETES = colors.colorsMuzLi;
DENSITY = 2000


function randomInt(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}


function getCorner(corner, x, y, height, width) {
    if(corner === 1) return `${x + width},${y}`;
    if(corner === 2) return `${x + width},${y + height}`;
    if(corner === 3) return `${x},${y + height}`;
    return `${x},${y}`;

}


function getPath(x, y, height, width) {
    let sides = randomInt(0, 4);
    let origin = randomInt(0, 4);
    let side = origin;

    if(sides === 0) {
        return '';
    }

    let d = `M${getCorner(origin, x, y, height, width)} `;

    for(let i = 0; i < sides; i++) {
        side = (side + 1) % 4;
        d += `L${getCorner(side, x, y, height, width)} `;
    }

    return d;
}


function getSquares(pallete) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let count = Math.floor(width * height / DENSITY);
    let squares = [];
    for(let i = 0; i < count; i++) {
        let square = {
            'x': randomInt(- 50, width - 50),
            'y': randomInt(- 50, height - 50),
            'height': randomInt(50, 150),
            'width': randomInt(50, 150),
            'fill': pallete[randomInt(0, pallete.length)]
        }
        square.d = getPath(square.x, square.y, square.height, square.width);

        squares.push(square);
    }
    return squares;
}


function clear(pallete) {
    document.getElementById('canvas').innerHTML = '';
    document.getElementById('canvas').style.backgroundColor = pallete[randomInt(0, pallete.length)];
}


function draw(squares) {
    content = '';
    for(square of squares) {
        content += `<rect x=${square.x} y=${square.y} 
        height=${square.height} width=${square.width} fill=${square.fill}
        opacity=0.8${randomInt(0, 10)}></rect>`

        if(square.d != ''){
            content += `<path d="${square.d}" fill="transparent" stroke="white"></path>`
        }
    }

    document.getElementById('canvas').innerHTML = content;
}


function generate() {
    let pallete = PALLETES[randomInt(0, PALLETES.length)]
    // Generate squares
    let squares = getSquares(pallete);

    // Clear screen
    clear(pallete);

    // Draw
    draw(squares);
}


generate();