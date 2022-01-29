arcs = (centerX, centerY, radius, start, end, resolution) => {
    let path = document.createElement('path');

    d = ''
    for(let i = 0; i < Math.abs(start - end) * resolution; i++) {
        vec = vector.newSpherical(radius, start + i / resolution)
        d += `L ${vec.x + centerX}, ${vec.y + centerY} `;
    }
    d = d.replace('L', 'M')
    path.setAttribute('d', d);
}