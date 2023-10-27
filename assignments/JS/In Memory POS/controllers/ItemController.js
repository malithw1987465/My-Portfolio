$("#Home").css("display","none");
$("#customer").css("display","none");
$("#orders").css("display","none");
getAllItems();

$("#btnItemSave").click(function(){
    if(checkAllItem()){
        saveItem();
    }else{
        alert("error");
    }
});

$("#btnViewAll").click(function(){
    getAllItems();
});

function bindTrEvents(){
    $("#tblItem>tr").click(function(){
        let id=$(this).children().eq(0).text();
        let name=$(this).children().eq(1).text();
        let qty=$(this).children().eq(2).text();
        let price=$(this).children().eq(3).text();

        $("#itemID").val(id);
        $("#itemName").val(name);
        $("#itemQty").val(qty);
        $("#itemPrice").val(price);

    });
}

$("#btnItemDelete").click(function(){
    let itemId=$("#itemID").val();

    let consent=confirm("Do you want to delete this Item ?");

    if(consent){
        let response=deleteItem(itemId);
        if(response){
            alert("Item Deleted Successfully. ");
            clearItemInputFields();
            getAllItems();
        }else{
            alert("Item not deleted!!!!");
        }
    }
});

$("#btnItemEdit").click(function(){
    let id=$("#itemID").val();
    updateItem();
    clearItemInputFields();
});

$("#btnItemClear").click(function(){
    clearItemInputFields();
});

function saveItem(){
    let itemID=$("#itemID").val();
    if (searchItem(itemID.trim()) == undefined) {
        let itemName = $("#itemName").val();
        let itemQty = $("#itemQty").val();
        let itemPrice=$("#itemPrice").val();

        let newItem = Object.assign({}, item);

        newItem.id = itemID;
        newItem.name = itemName;
        newItem.qtyOnHand = itemQty;
        newItem.price=itemPrice;

        itemDB.push(newItem);
        clearItemInputFields();
        getAllItems();

    } else {
        alert("Customer already exits.!");
        clearCustomerInputFields();
    }
}

function getAllItems() {
    $("#tblItem").empty();

    for (let i = 0; i < itemDB.length; i++) {
        let id = itemDB[i].id;
        let name = itemDB[i].name;
        let qty = itemDB[i].qtyOnHand;
        let unitPrice = itemDB[i].unitPrice;

        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${qty}</td>
                     <td>${unitPrice}</td>
                    </tr>`;

        $("#tblItem").append(row);


    }
}
function deleteItem(id) {
    
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].id == id) {
            itemDB.splice(i,1);
            return true;
        }
            return false;
       
}
}

function searchItem(id) {
    return itemDB.find(function (item) {
        return item.id == id;
    });
}

function updateItem(id) {
    let itemId=$("#itemID").val();
    if (searchItem(itemId) == undefined) {
        alert("No such item..please check the ID");
    } else {
        let con = confirm("Do you really want to update this item.?");
        if (con) {
            let item = searchItem(itemId);

            let itemName = $("#itemName").val();
            let itemQty = $("#itemQty").val();
            let itemPrice=$("#itemPrice").val();

            item.name = itemName;
            item.qtyOnHand = itemQty;
            item.unitPrice=itemPrice;

            getAllItems();
        }
    }

}