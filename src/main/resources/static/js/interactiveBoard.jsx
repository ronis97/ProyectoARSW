
let width = 400;
let height = 400;
let index = 0;
let typeFigure = null;
let sizeOfFigure = 20;
const setup = (p5) => {

    
    //Configuracion inicial
    p5.setup = () => {
      p5.createCanvas(width, height).parent("p5Sketch");
      changeFigure();
    };

    //Configuracion del tablero
    p5.draw = () => {
        p5.fill(255);
        //p5.stroke(0);
        //p5.fill(255,255,255);
        //p5.rect(0,0,width,height);
        //resetea el tablero
    

    };
    p5.mouseClicked = () => {
        
        if (isValid(p5.mouseX, p5.mouseY)){
            let figure = null;
            if(typeFigure === "circulo"){
                figure = p5.ellipse(p5.mouseX,p5.mouseY,sizeOfFigure,sizeOfFigure);
                p5.fill(255,255,255);
            }
            else if (typeFigure === "triangulo"){
                figure = p5.triangle(p5.mouseX -(sizeOfFigure/2), p5.mouseY - (sizeOfFigure/2),
                    p5.mouseX + (sizeOfFigure/2), p5.mouseY- (sizeOfFigure/2), 
                    p5.mouseX + (sizeOfFigure/4), p5.mouseY + (sizeOfFigure/4));     
            }
            else if (typeFigure === "cuadrado"){
                figure = p5.square(p5.mouseX, p5.mouseY, sizeOfFigure);
                //console.log(p5.mouseX,p5.mouseY);
                //console.log(figure)
            }
            var dataFigure = {x:p5.mouseX, y:p5.mouseY, type:typeFigure, size:sizeOfFigure}
            console.log(dataFigure);
            axios.post('/drawpoints',dataFigure);
        }   
    };
    
};


function refresh(){
    var points = axios.get('/drawpoints').then( points => {
        //restart();
        if (points.data != null){
            for (var i = 0; i < points.data.length; i++){
                sizeOfFigure = points.data[i].size;
                typeFigure = points.data[i].type;
                putFigure(points.data[i].x, points.data[i].y,points.data[i].type);
            }

        }
    });
}

function putFigure(x,y,typeOfFigure){
    if (typeOfFigure == "circulo"){
        myp5.ellipse(x,y,sizeOfFigure,sizeOfFigure);
    }
    else if (typeFigure == "cuadrado"){
        myp5.square(x,y,sizeOfFigure);
    }
    else if (typeFigure == "triangulo"){
        myp5.triangle(x -(sizeOfFigure/2), y - (sizeOfFigure/2),
        x + (sizeOfFigure/2), y- (sizeOfFigure/2), 
        x + (sizeOfFigure/4), y + (sizeOfFigure/4));
    }
}

function restart(){
    myp5.clear();
    axios.post('/restart');
}

function changeFigure(){
    var btn = document.getElementById("btn2");
    btn.value = "value"
    index++;
    if (index > 2){index = 0}
    let listOfFigures = ["triangulo", "cuadrado", "circulo"];
    typeFigure = listOfFigures[index];
    btn.innerHTML = "Cambiar figura: " + typeFigure;
    //console.log(typeFigure);
}

function changeSize(){
    let value = window.prompt("Ingrese el tamaño de la nueva figura: ");
    while (value == null){
        value = window.prompt("No ha ingresado ningun valor");
    }
    sizeOfFigure = parseInt(value);
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
refresh();