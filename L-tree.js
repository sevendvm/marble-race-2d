
class LSystem {

    constructor() {

        // defaults 
        this.strokeLength = 200;
        this.strokeLengthMultiplier = 0.5;

        // a tree
        // this.angle = PI / 6;
        // this.axiom = "F"
        // this.sentence = "F"
        // this.rules = [
        //         {a : "F", 
        //         b: "FF+[+F-F+F]-[-F+F+F]"}
        //     ];

        
        // a fractal plant
        // this.angle = radians(25);
        // this.axiom = "X";
        // this.sentence = this.axiom;
        // this.rules = [
        //     {
        //         a: "X",
        //         b: "F+[[X]-X]-F[-FX]+X"
        //     },
        //     {
        //         a: "F",
        //         b: "FF"
        //     }
        // ]

        // dragon curve
        // NOTE defaults "strokeLength" and its multiplier are overriden
        // this.strokeLength = 10;
        // this.strokeLengthMultiplier = 1;
        // this.angle = PI/2;
        // this.axiom = "FX";
        // this.sentence = this.axiom;
        // this.rules = [
        //     {
        //         a: "X",
        //         b: "X+YFF+"
        //     },
        //     {
        //         a: "Y",
        //         b: "-FFX-Y"
        //     }
        // ]

        // Koch curve
        this.strokeLength = 5;
        this.strokeLengthMultiplier = 1;
        this.angle = PI / 2;
        // being set this turns into a Serpinsky triangle
        //this.angle = PI * 4 / 3;
        this.axiom = "F";
        this.sentence = this.axiom;
        this.rules = [
            {
                a: "F",
                b: "F+F-F-F+F"
            },
        ]



    }
    evolve() {
        this.strokeLength *= this.strokeLengthMultiplier;

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
        translate(width/2, height);
        stroke(255);


        for (let index = 0; index < this.sentence.length; index++) {
            const element = this.sentence.charAt(index);

            // console.log(element)

            switch (element) {
                case "F":
                    line(0, 0, 0, -this.strokeLength);
                    translate(0, -this.strokeLength);
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

