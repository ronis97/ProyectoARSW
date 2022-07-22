
let width = 400;
let height = 400;
let index = 0;
let typeFigure = "cuadrado";
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

communicationWebSocket.onmessage = function(e){
    refresh();
    if (e.data != "Connection established."){
        infoData = JSON.parse(e.data);
        if (infoData != null){
            console.log(infoData.changingColor === "true");
            if (infoData.reset === "true"){
                myp5.clear();
                updateValues();
            }
            if (infoData.last === "true"){
                myp5.clear();
                deleteLastDiv();
                refresh();
            }
            if (infoData.change === "true"){
                myp5.clear();
                updateValues();
            }
            if (infoData.changefigure === "true"){
                typeFigure = infoData.figure;
                console.log(typeFigure);
            }
            else{
                addelement();
            }
        }
    }
    
};
const setup = (p5) => {

    
    //Configuracion inicial
    p5.setup = () => {
      p5.createCanvas(width, height).parent("p5Sketch");
      var btn = document.getElementById("btn2");
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
            addelement();
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
    refresh();
}

function refresh(){
    let completelist = document.getElementById("thelist");
    let changeButton = document.getElementById("changeDiv");
    myp5.clear();
    //document.getElementById("thelist").innerHTML = "";
    var points = axios.get('/drawpoints').then( points => {
        
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
        if (points.data.length === 0) {
            completelist.style.display = 'none';
            completelist.style.overflow = 'hidden';
            changeButton.style.display = "none";
        }
        else{
            completelist.style.display = 'list-item';
            completelist.style.overflowY = 'scroll';
            changeButton.style.display = "flex"
        }
    });
    
}

function addelement() {
    var completelist= document.getElementById("thelist");
    completelist.innerHTML = "";
    var points = axios.get('/drawpoints').then( points => {
        //console.log(points.data.length);
        
        for (var i = 0; i < points.data.length; i++){
            let datas = document.createElement('div');
            let xBox = document.createElement('input');
            xBox.className = "valores";
            xBox.id = "datax" + i;
            let xlabel = document.createElement('label');
            xlabel.innerHTML = "( "+i+" ) " + "x: ";
            xlabel.htmlFor = "datax" + i;
            xlabel.className = "infodata";
            xBox.value = points.data[i].x;
       //     xBox.addEventListener("click",function(){
       //         this.value = "";
      //      });
            let divsepar = document.createElement('div');
            divsepar.className = "divider2";
            let yBox = document.createElement('input');
            yBox.className = "valores";
            yBox.id = "datay"+i;
            let yLabel = document.createElement('label');
            yLabel.innerHTML = "y: ";
            yLabel.htmlFor = "datay" + i;
            yLabel.className = "infodata"
            yBox.value = points.data[i].y;
            //yBox.addEventListener("click",function(){
         //       this.value = "";
        //    });
            xBox.addEventListener("click",function() {
                xBox.value = "";
            });
            yBox.addEventListener("click",function() {
                yBox.value = "";
            });
            datas.append(xlabel);
            datas.append(xBox);
            datas.append(divsepar);
            datas.append(yLabel);
            datas.append(yBox);
            datas.id = "linea" + i;
            datas.className="infoss";
            completelist.append(datas);
            let salto = document.createElement('br');
            completelist.append(salto);
        }
    });
    refresh();
    //refresh();
}

function updateValues(){
    var points = axios.get('/drawpoints').then( points => {
        for (var i = 0; i < points.data.length; i++){
            let xBox = document.getElementById("datax"+i);
            let yBox = document.getElementById("datay"+i);
            xBox.value = points.data[i].x;
            yBox.value = points.data[i].y;
        }
    });
    refresh();
}

//console.log (document.getElementById("datax0"));
function changeValues(){
    myp5.clear();
    let longitud = 0;
    var points = axios.get('/drawpoints').then(points =>{
        longitud = points.data.length;
        for (var i = 0; i < longitud; i++){
            let xBoxx = document.getElementById("datax"+i);
            let yBoxx = document.getElementById("datay"+i);
            console.log(xBoxx,yBoxx);
            let xValue = xBoxx.value;
            let yValue = yBoxx.value;
            if (xValue != "" || yValue  != ""){
                if (isChange(points.data[i].x,points.data[i].y,xValue,yValue)){
                    sendValues(i,xValue,yValue);
                }
            }
        }
    });
    communicationWebSocket.send('{ "change": "true" }');
    myp5.clear();
    refresh();
    //console.log(points)
}

function isChange(x,y, newx, newy){
    let flag = false;
    if (x != newx || y != newy){
        flag = true;
    }
    return flag;
}

function sendValues(pos,newx,newy){
    let coordinates = {x: newx, y: newy, position:pos};
    axios.post('/getNewCoordinates',coordinates);
    //console.log("funciona xD");
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
    var url = 'wss://' + (host) + '/bbService';
    //var url = 'ws://' + (host) + '/bbService';
    return url;
}

function deleteLastFigure(){
    axios.post('/eraseLast');
    myp5.clear();
    communicationWebSocket.send('{ "last": "true" }')
    refresh();   
    deleteLastDiv();
}

function deleteLastDiv(){
    let listOfDivs = document.getElementById("thelist");
    let count = listOfDivs.getElementsByClassName("infoss").length;
    let last = document.getElementById("linea"+(count-1));
    console.log(count);
    listOfDivs.removeChild(last);
}

function changeFigure(){
    var btn = document.getElementById("btn2");
    btn.value = "value"
    index++;
    if (index > 2){index = 0}
    let listOfFigures = ["triangulo", "cuadrado", "circulo"];
    typeFigure = listOfFigures[index];
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
    user = localStorage.getItem("username");
    let titulo = document.getElementById("titulo");
    titulo.innerHTML = "Usuario:  "+user;
    refresh();
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
    else if(element.id === "thelist"){
        element.style.display = 'list-item';
    }
    else{
        element.style.display = 'flex';
    }
}

function changeColor(){
    hideElement(document.getElementById('p5Sketch'));
    hideElement(document.getElementById('botones'));
    hideElement(document.getElementById('botones1'));
    hideElement(document.getElementById("thelist"));
    hideElement(document.getElementById("btn7"));
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
        showElement(document.getElementById("thelist"));
        showElement(document.getElementById("btn7"));
    }
}

let myp5 = new p5(setup,document.getElementById('p5Sketch'));
requestUserName();
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


