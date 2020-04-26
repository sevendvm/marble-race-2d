
let firstInit = true;

class LSystem {

    constructor(parType) {

        console.log(parType);

        this.initialX = width / 2;
        this.initialY = height;

        // defaults 
        this.strokeLength = 200;
        this.strokeLengthMultiplier = 0.5;

        switch (parType) {
            case "fractalPlant":
                // a fractal plant
                this.angle = radians(25);
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
                ];
                break;
            case "dragonCurve":
                // dragon curve
                // NOTE defaults "strokeLength" and its multiplier are overriden
                this.initialX = width / 2;
                this.initialY = height / 2;
                this.strokeLength = 10;
                this.strokeLengthMultiplier = 1;
                this.angle = PI / 2;
                this.axiom = "FX";
                this.sentence = this.axiom;
                this.rules = [
                    {
                        a: "X",
                        b: "X+YFF+"
                    },
                    {
                        a: "Y",
                        b: "-FFX-Y"
                    }
                ]
                break;
            case "KochCurve":
                // Koch curve
                this.strokeLength = 5;
                this.strokeLengthMultiplier = 1;
                this.angle = PI / 2;
                // being set this turns into a Serpinsky triangle
                this.angle = PI * 4 / 3;
                this.axiom = "F";
                this.sentence = this.axiom;
                this.rules = [
                    {
                        a: "F",
                        b: "F+F-F-F+F"
                    },
                ]
                break
            default:
                // a tree
                // case "lindenmayer":
                this.angle = PI / 12;
                this.axiom = "F"
                this.sentence = "F"
                this.rules = [
                    {
                        a: "F",
                        // b: "FF+[+F-F+F]-[-F+F+F]"}
                        b: "FF+[-F-[-F+F]]-[-F++FFF[-F+F]]"
                    }
                ];

                break;
        }







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
        translate(this.initialX, this.initialY);
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

let btnEvolve = null;


function setup(par) {
    console.log(par)
    lSystem = new LSystem(par);
    
    createCanvas(800, 800);

    if (firstInit) {
        let btnEvolve = createButton("evolve");
        btnEvolve.mousePressed(onButtonPress);

        selAngle = createSelect();
        selAngle.option('120');
        selAngle.option('90');
        selAngle.option('45');
        selAngle.option('25');
        selAngle.changed(setup);

        firstInit = false;
    }
    
    

    lSystem.turlte();

}