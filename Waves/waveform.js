class WaveForm {
    constructor(rows, columns, hIncrement, vIncrement, seed) {
        this.rows = rows;
        this.columns = columns;
        this.hIncrement = hIncrement;
        this.vIncrement = vIncrement;
        this.seed = seed;

        this.offset = 0;
        this.waves = [];

        this.generate();
    }

    generate() {
        noise.seed(this.seed);
        this.waves = [];

        for(let i = 0; i < this.rows; i++) {
            let wave = []
            for(let j = 0; j < this.columns; j++) {
                wave.push(noise.simplex2(i * this.vIncrement, j * this.hIncrement));
            }
            this.waves.push(wave);
        }
    }

    step(offset) {
        noise.seed(this.seed);
        this.offset += this.hIncrement;

        for(let i in this.waves) {
            this.waves[i].shift();
            // console.log(i * this.vIncrement, this.columns * this.hIncrement + this.offset)
            this.waves[i].push(noise.simplex2(i * this.vIncrement, this.columns * this.hIncrement + this.offset))
        }
    }

    render(scale) {
        let render = [];

        for(let i in this.waves) {
            let wave = this.waves[i];
            let row = [];

            for (let j in wave) {
                let curve = Math.sin(Math.PI * j / this.columns)
                row.push(curve * scale * wave[j]);
            }

            render.push(row);
        }

        return render;
    }
}