PALLETES = colors.colorsMuzLi;
DENSITY = 40;


function randomInt(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}


function rightBlade(x, y, height, width) {
    return `${x},${y} ${x + width},${y} ${x + width + height},${y + height} ${x + height},${y + height}`
}


function leftBlade(x, y, height, width) {
    return `${x},${y} ${x - width},${y} ${x - width - height},${y + height} ${x - height},${y + height}`
}


function rightEdge(x, y, height, width) {
    return `${x},${y} ${x + height},${y + height} ${x + height},${y + height + width} ${x},${y + width}`
}


function leftEdge(x, y, height, width) {
    return `${x},${y} ${x - height},${y + height} ${x -  height},${y + height + width} ${x},${y + width}`
}


function getPath(points) {
    let count = randomInt(0, 4);

    if(count === 0) {
        return '';
    }

    let cords = [];
    for(let point of points.split(' ')) {
        cord = point.split(',');
        cords.push([parseInt(cord[0]), parseInt(cord[1])]);
    }

    let start = randomInt(0, 4);

    d = `M${cords[start][0]} ${cords[start][1]} `
    for (let i = 0; i < count; i++) {
        start = (start + 1) % 4;
        d += `L ${cords[start][0]} ${cords[start][1]} `
    }

    return d;

}


function getShapes(pallete) {
    let windowWidth = window.innerWidth;
    let windowheight = window.innerHeight;
    let count = Math.floor(windowheight / DENSITY);
    let shapes = [];
    for(let i = 0; i < count; i++) {

        height = randomInt(150, parseInt(windowWidth / 4));
        width = randomInt(50, 150);
        // width = randomInt(150, parseInt(windowWidth / 2));

        x = randomInt(parseInt(windowWidth / 4), parseInt(windowWidth * 3 / 4))
        y = randomInt(0, windowheight - parseInt(windowWidth / 4));

        let shape = {
            'fill': pallete[randomInt(0, pallete.length)],
            'opacity': randomInt(0, 10),
        }

        if(randomInt(0, 1) === 0) {
            // Draw edge
            shape.right = rightEdge(x, y, height, width);
            shape.rightPath = getPath(shape.right);
            shape.left = leftEdge(windowWidth - x, y, height, width);
            shape.leftPath = getPath(shape.left);
        }
        else {
            // Draw blade
            shape.right = rightBlade(x, y, height, width);
            shape.rightPath = getPath(shape.right);
            shape.left = leftBlade(windowWidth - x, y, height, width);
            shape.leftPath = getPath(shape.left);
        }

        shapes.push(shape)
    }
    return shapes;
}


function clear(pallete) {
    document.getElementById('canvas').innerHTML = '';
    document.getElementById('canvas').style.backgroundColor = pallete[randomInt(0, pallete.length)];
}


function draw(shapes) {
    content = '';
    for(shape of shapes) {
        content += `<polygon points="${shape.right}" fill=${shape.fill}
        opacity=0.8${shape.opacity}></polygon><polygon points="${shape.left}" 
        fill=${shape.fill} opacity=0.8${shape.opacity}></polygon>`

        if(shape.rightPath != '') {
            content += `<path d="${shape.rightPath}" fill="transparent" stroke="white"></path>`
        }

        if(shape.leftPath != '') {
            content += `<path d="${shape.leftPath}" fill="transparent" stroke="white"></path>`
        }
    }

    document.getElementById('canvas').innerHTML = content;
}


function generate() {
    let pallete = PALLETES[randomInt(0, PALLETES.length)]

    shapes = getShapes(pallete);

    clear(pallete);
    draw(shapes);
}


generate();