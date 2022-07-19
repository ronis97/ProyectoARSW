
let width = 400;
let height = 400;
let index = 0;
let typeFigure = null;
let sizeOfFigure = 20;
let user = null;
let lastx = 0;
let lasty = 0;
var rColor = 255;
var gColor = 255;
var bColor = 255;
let communicationWebSocket = new WebSocket(BBServiceURL());
let msgSending = null;
let isReset = false;
let showValues = true;
const setup = (p5) => {

    
    //Configuracion inicial
    p5.setup = () => {
      p5.createCanvas(width, height).parent("p5Sketch");
      changeFigure();
    };

    //Configuracion del tablero
    p5.draw = () => {
        //p5.stroke(0);
        //p5.fill(255,255,255);
        //p5.rect(0,0,width,height);
        //resetea el tablero
    };
    p5.mouseClicked = () => {

        if (isValid(p5.mouseX, p5.mouseY)){
            lastx = p5.mouseX;
            lasty = p5.mouseY;
            p5.fill(rColor,gColor,bColor);
            if(typeFigure === "circulo"){
                p5.ellipse(p5.mouseX,p5.mouseY,sizeOfFigure,sizeOfFigure);  
            }
            else if (typeFigure === "triangulo"){
                p5.triangle(p5.mouseX -(sizeOfFigure/2), p5.mouseY - (sizeOfFigure/2),
                    p5.mouseX + (sizeOfFigure/2), p5.mouseY- (sizeOfFigure/2), 
                    p5.mouseX + (sizeOfFigure/4), p5.mouseY + (sizeOfFigure/4));     
            }
            else if (typeFigure === "cuadrado"){
                p5.square(p5.mouseX, p5.mouseY, sizeOfFigure);
                //console.log(p5.mouseX,p5.mouseY);
                //console.log(figure)
            }
            //refresh();
            var colorData = {r:rColor, g:gColor, b: bColor};
            var dataFigure = {x:p5.mouseX, y:p5.mouseY, type:typeFigure, 
                size:sizeOfFigure, nameuser:user, color:colorData};
            //console.log(dataFigure);
            //console.log(user);
            msgSending = '{ "x": ' + (p5.mouseX) + ' ,"y": ' + (p5.mouseY) + ' ,"type": "' + typeFigure
                + '" ,"size": ' + sizeOfFigure + ' ,"user": "' + user  + '"}';
            //console.log(msgSending);
            communicationWebSocket.send(msgSending);
            axios.post('/drawpoints',dataFigure);
            refresh();
        }   
    };
};

function showHideIndexes(){
    let boton = document.getElementById("btn6");
    showValues = !showValues;
    if (showValues){
        boton.innerHTML = "Ocultar indices";
    }
    else{
        boton.innerHTML = "Mostrar indices"
    }
    myp5.clear();
    refresh();
}

function refresh(){
    var points = axios.get('/drawpoints').then( points => {
        //restart();
        if (points.data != null){
            for (var i = 0; i < points.data.length; i++){
                sizeOfFigure = points.data[i].size;
                typeFigure = points.data[i].type;
                rColor = points.data[i].color.r;
                gColor = points.data[i].color.g;
                bColor = points.data[i].color.b;
                //user = points.data[i].nameuser;
                putFigure(i,points.data[i].x, points.data[i].y,points.data[i].type);
            }
        }
    });
    addelement();
}

function addelement() {
    var completelist= document.getElementById("thelist");
    var points = axios.get('/drawpoints').then( points => {
        //console.log(points.data.length);
        if (points.data.length === 0) {
            completelist.style.display = 'none';
            completelist.style.overflow = 'hidden';
        }
        else{
            completelist.style.display = 'list-item';
            completelist.style.overflowY = 'scroll';
        }
    for (var i = 0; i < points.data.length; i++){
        let datas = document.createElement('div');
        let xBox = document.createElement('input');
        xBox.className = "valores";
        xBox.id = "datax" + i;
        xBox.addEventListener("click",function(){
            this.value = "";
        });
        let xlabel = document.createElement('label');
        xlabel.innerHTML = "( "+i+" ) " + "x: ";
        xlabel.htmlFor = "datax" + i;
        xBox.value = points.data[i].x;
        let divsepar = document.createElement('div');
        divsepar.className = "divider2";
        let yBox = document.createElement('input');
        yBox.className = "valores";
        let yLabel = document.createElement('label');
        yLabel.innerHTML = "y: ";
        yLabel.htmlFor = "datay" + i;
        yBox.value = points.data[i].y;
        datas.append(xlabel);
        datas.append(xBox);
        datas.append(divsepar);
        datas.append(yLabel);
        datas.append(yBox);
        datas.id = "linea" + i;
        //datas.innerHTML = "<input type='text' name='type' class = 'valores' value='" 
        //    +points.data[i].x + "'>";
        completelist.append(datas);
        let salto = document.createElement('br');
        completelist.append(salto);
    }
    });
    completelist.innerHTML = "";
}

function changeValue(pos, newx, newy){

}

function putFigure(pos,x,y,typeOfFigure){
    //console.log(pos + " " + x + " " + y);
    if (showValues){
        myp5.textSize(10);
        myp5.fill(0,0,0);
        if (typeOfFigure == "circulo" || typeOfFigure == "triangulo"){
            myp5.text(pos,x+10,y-10);
        }
        else{
            myp5.text(pos,x,y);
        }
    }
    myp5.fill(rColor,gColor,bColor);
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
    refresh();
    isReset = true;
    let msg = '{ "reset": "true" }';
    communicationWebSocket.send(msg);
    isReset = false;
}

function BBServiceURL() {
    var host = window.location.host;
    //var url = 'wss://' + (host) + '/bbService';
    var url = 'ws://' + (host) + '/bbService';
    //console.log("URL Calculada: " + url);
    return url;
}

function deleteLastFigure(){
    axios.post('/eraseLast');
    myp5.clear();
    communicationWebSocket.send('{ "last": "true" }')
    refresh();   
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

function requestUserName(){
    user = window.prompt("Ingrese su nombre de usuario: ");
    while (user == null){
        user = window.prompt("No ha ingresado un usuario: ")
    }
    //console.log(user);
    //return user;
}

function isValid(xx, yy){
    let isValid = false;
    if (xx > 0 && yy > 0 && xx < width && yy < height){
        isValid = true;
    }
    else {isValid = false;}
    if (lastx === xx && lasty === yy){
        isValid = false;
    }
    return isValid;
}

function hideElement(element){
    element.style.display = 'none';
}

function showElement(element){
    //console.log(typeof element)
    if (element.id === "colorConfiguration"){
        element.style.display = 'grid';
    }
    else{
        element.style.display = 'flex';
    }
}

function changeColor(){
    hideElement(document.getElementById('p5Sketch'));
    hideElement(document.getElementById('botones'));
    hideElement(document.getElementById('botones1'));
    showElement(document.getElementById('colorConfiguration'));
}

function submitValues(){
    let rr = document.getElementById('r').value;
    let gg = document.getElementById('g').value;
    let bb = document.getElementById('b').value;
    //console.log(rr);
    if (rr ==="" || gg ==="" || bb === ""){
        document.getElementById('info').innerHTML 
            = "Alguno de los valores ingresados es nulo";
    }
    else{
        rColor = rr;
        gColor = gg;
        bColor = bb;
        hideElement(document.getElementById('colorConfiguration'));
        showElement(document.getElementById('botones'));
        showElement(document.getElementById('botones1'));
        showElement(document.getElementById('p5Sketch'));
    }
}

let myp5 = new p5(setup,document.getElementById('p5Sketch'));
requestUserName();
refresh();
communicationWebSocket.onopen = function () {
    communicationWebSocket.send(msgSending);
};

let infoData = null;



function resetColor(){
    rColor = 255;
    gColor = 255;
    bColor = 255;
    myp5.fill (rColor,gColor, bColor);
}
communicationWebSocket.onmessage = function(e){
    refresh();
    if (e.data != "Connection established."){
        infoData = JSON.parse(e.data);
        //console.log(infoData)
        //console.log(typeof infoData);
        //console.log()
        if (infoData != null){
            console.log(infoData.changingColor === "true");
            if (infoData.reset === "true"){
                myp5.clear();
            }
            if (infoData.last === "true"){
                myp5.clear();
                refresh();
            }
        }
    }
    
};

function isOpen(ws) { return ws.readyState === ws.OPEN }

