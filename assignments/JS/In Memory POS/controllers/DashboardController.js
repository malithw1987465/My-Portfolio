initUI();
$("#orders").css("display","none");
$("#customer").css("display","none");
$("#item").css("display","none");
function initUI(){
    clearAll();
    $("#Home").css("display","block");
    setLastView();
}

function saveView(clickedID){
    switch(clickedID){
        case "Home":
            localStorage.setItem("view","HOME");
            break;
        case "Customer":
            localStorage.setItem("view","CUSTOMER");
            break;
        case "Item":
            localStorage.setItem("view","ITEM");
            break;
        case "Orders":
            localStorage.setItem("view","ORDERS");
            break;
    }
}

function setLastView(){
    let view=localStorage.getItem("view");

    switch(view){
        case "HOME":
            setView($("#Home"));
            break;
        case "CUSTOMER":
            setView($("#Customer"));
            break;
        case "ITEM":
            setView($("#Item"));
            break;
        case "ORDERS":
            setView($("#Orders"));
            break;
        default:
            setView($("#Home"));
    }
}

function clearAll(){
    $("#Home,#Customer,#Item,#Orders").css("display","none");
}

function setView(viewOb){
    clearAll();
    viewOb.css("display","block");
    saveView(viewOb.get(0).id);
    console.log(viewOb.get(0).id);
}

$("#lnkHome").click(function(){
    setView($("#Home"));
});

$("#lnkOrders").click(function(){
    setView($("#Orders"));
});

$("#lnkItem").click(function(){
    setView($("#Item"));
});

$("#lnkCustomer").click(function(){
    setView($("#Customer"));
});