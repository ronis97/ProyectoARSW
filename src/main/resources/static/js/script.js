function getValue(){
    let box = document.getElementById("box");
    box.addEventListener("click",function(){
        box.value = "";
    });
}

function validateValue(){
    let data = document.getElementById("data");
    if (data.value != ""){
        return data.value;
    }
    else{
        window.prompt("No ha ingresado usuario valido");
    }
}