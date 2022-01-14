(function(global){
    let module = global.vector = {};

    function magnitude(x, y, z) {
        return Math.sqrt(x * x + y * y + z * z);
    }

    module.new = (x, y, z) => {
        if (x === undefined) x = 0;
        if (y === undefined) y = 0;
        if (z === undefined) z = 0;
        return {
            x: x,
            y: y,
            z: z,
            mag: magnitude(x, y, z),
        };
    }

    module.newSpherical = (r, t, p) => {
        if (r === undefined) r = 0;
        if (t === undefined) t = 0;
        if (p === undefined) p = 90;

        t *= Math.PI / 180;
        p *= Math.PI / 180;

        return {
            x: r * Math.sin(p) * Math.cos(t),
            y: r * Math.sin(p) * Math.sin(t),
            z: r * Math.cos(p),
            mag: r,
        };
    }

    module.add = (a, b) => {
        if (a === undefined) a = module.new(0, 0, 0);
        if (b === undefined) b = module.new(0, 0, 0);

        let sum = {
            x: a.x + b.x,
            y: a.y + b.y,
            z: a.z + b.z,
        };

        sum.mag = magnitude(sum.x, sum.y, sum.z);

        return sum;
    }

    module.scale = (a, s) => {
        if (a === undefined) a = mocule.new(0, 0, 0);
        if (s === undefined) return a;

        return {
            x: a.x * s,
            y: a.y * s,
            z: a.z * s,
            mag: a.mag * s,
        };
    }

    module.rotateXY = (a, d) => {
        if (a === undefined) a = mocule.new(0, 0, 0);
        if (d === undefined) return a;

        return {
            x: a.x * Math.cos(d) - a.y * Math.sin(d),
            y: a.x * Math.sin(d) + a.y * Math.cos(d),
            z: a.z,
            mag: a.mag,
        };
    }

    module.rotateYZ = (a, d) => {
        if (a === undefined) a = mocule.new(0, 0, 0);
        if (d === undefined) return a;

        return {
            x: a.x,
            y: a.y * Math.cos(d) - a.z * Math.sin(d),
            z: a.y * Math.sin(d) + a.z * Math.cos(d),
            mag: a.mag,
        };
    }

    module.rotateZX = (a, d) => {
        if (a === undefined) a = mocule.new(0, 0, 0);
        if (d === undefined) return a;

        return {
            x: a.z * Math.sin(d) + a.x * Math.cos(d),
            y: a.y,
            z: a.z * Math.cos(d) - a.x * Math.sin(d),
            mag: a.mag,
        };
    }

})(this);