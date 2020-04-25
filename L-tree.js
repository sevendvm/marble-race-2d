
class LSystem {

    constructor() {


        //
        // let axiom = "F"
        // let sentence = "F"
        // let rules = [
        //         {a : "F", 
        //         b: "FF+[+F-F+F]-[-F+F+F]"}
        //     ];

        this.len = 200;
        this.angle = radians(25);

        // a fractal plant

        this.axiom = "X";
        this.sentence = this.axiom;
        this.rules = [
            {
                a: "X",
                b: "F+[[X]-X]-F[-FX]+X"
            },
            {
                a: "F",
                b: "FF"
            }
        ]
    }
    evolve() {
        this.len *= 0.5;

        let nextSentence = "";

        for (let index = 0; index < this.sentence.length; index++) {
            const char = this.sentence.charAt(index);

            let ruleFound = false;

            this.rules.forEach(element => {
                if (!ruleFound && char == element.a) {
                    nextSentence += element.b
                    ruleFound = true;
                }
            });

            if (!ruleFound) {
                nextSentence += char
            }
        }

        this.sentence = nextSentence

        // console.log(sentence)
        this.turlte()
    }

    turlte() {
        background(50);
        resetMatrix();
        translate(width / 2, height);
        stroke(255);


        for (let index = 0; index < this.sentence.length; index++) {
            const element = this.sentence.charAt(index);

            // console.log(element)

            switch (element) {
                case "F":
                    line(0, 0, 0, -this.len);
                    translate(0, -this.len);
                    break;
                case "+":
                    rotate(this.angle);
                    break;
                case "-":
                    rotate(- this.angle);
                    break;
                case "[":
                    push();
                    break;
                case "]":
                    pop();
                    break;
                default:
                    break;
            }

        }

    }
}


let lSystem = null;

function onButtonPress() {
    lSystem.evolve();
    lSystem.turlte();
}

function setup() {

    lSystem = new LSystem();

    createCanvas(800, 800);
    let btnEvolve = createButton("evolve");
    btnEvolve.mousePressed(onButtonPress);

    lSystem.turlte();

}

