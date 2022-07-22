function getValue(){
    let box = document.getElementById("box");
    box.addEventListener("click",function(){
        box.value = "";
    });
}

function validateValue(){
    let data = document.getElementById("box");
    let box = document.getElementById("data");
    if (data.value != ""){
        location.href = "drawingBoard.html";
        localStorage.setItem("username",data.value);
    }
    else{
        window.alert("No ha ingresado usuario valido");
    }
}