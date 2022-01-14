const SPEED = 0.06
const XY_SCALE = 3
const NOISE_SCALE = 0.03

class Orb{
    constructor(x, y, radius, seed, points=360){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.seed = seed;
        this.points = points;

        this.vectors = [];
        this.offset = 0;

        this.generate();
    }

    generate() {
        let vec = vector.new(this.radius, 0, 0);
        let deg = 0;

        for(let i = 0; i <= this.points; i++) {
            // Degrees to rotate the vector by
            deg = 2 * Math.PI * i / this.points;

            this.vectors.push(vector.rotateXY(vec, deg))
        }
    }

    step() {
        let scale = XY_SCALE / this.radius;
        let render = [];
        noise.seed(this.seed);
        this.offset = this.offset + SPEED;

        for(let vec of this.vectors) {
            // let wiggle = noise.simplex3((this.x + vec.x) * scale, (this.y + vec.y) * scale, this.offset);
            let wiggle = noise.simplex2((this.x + vec.x) * scale + this.offset, (this.y + vec.y) * scale + this.offset);
            vec = vector.scale(vec, (wiggle * NOISE_SCALE + 1))
            render.push([this.x + vec.x, this.y + vec.y])
        }

        return render;
    }
}