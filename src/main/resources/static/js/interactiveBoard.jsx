
let width = 200;
let height = 200;
let index = 0;
let resetBoolean = false;
let typeFigure = null;
const setup = (p5, canvasParentRef) => {

    
    //Configuracion inicial
    p5.setup = () => {
      p5.createCanvas(width, height).parent(canvasParentRef);
      changeFigure();
    };

    //Configuracion del tablero
    p5.draw = () => {
        //resetea el tablero
        if (resetBoolean){
            p5.clear();
            resetBoolean = false;
        }
    };
    p5.mouseClicked = () => {
        
        if (isValid(p5.mouseX, p5.mouseY)){
            if(typeFigure === "ellipse"){
                p5.ellipse(p5.mouseX,p5.mouseY,20,20);
            }
            else if (typeFigure === "triangle"){
                p5.triangle(p5.mouseX -10, p5.mouseY - 10,
                    p5.mouseX + 10, p5.mouseY- 10, p5.mouseX + 5, p5.mouseY + 5);     
            }
            else if (typeFigure === "square"){
                p5.square(p5.mouseX, p5.mouseY, 20);
            }
        }   
    };

    
};

function restart(){
    resetBoolean = true;
}

function changeFigure(){
    var btn = document.getElementById("btn2");
    btn.value = "value"
    index++;
    if (index > 2){index = 0}
    let listOfFigures = ["triangle", "square", "ellipse"];
    typeFigure = listOfFigures[index];
    btn.innerHTML = "Cambiar figura: " + typeFigure;
    console.log(typeFigure);
}

function isValid(x, y){
    let isValid = false;
    if (x > 0 && y > 0 && x < width && y < height){
        isValid = true;
    }
    else {isValid = false;}
    return isValid;
}
  
let myp5 = new p5(setup,document.getElementById('p5Sketch'));