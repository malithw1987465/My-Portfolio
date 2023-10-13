const ITEM_ID_REGEX = /^(I00-)[0-9]{3}$/;
const ITEM_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const ITEM_QTY_REGEX =  /^0$|^[1-9][0-9]*$/;
const ITEM_PRICE_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

//add validations and text fields to the
let i_vArray = new Array();
i_vArray.push({field: $("#itemID"), regEx: ITEM_ID_REGEX});
i_vArray.push({field: $("#itemName"), regEx: ITEM_NAME_REGEX});
i_vArray.push({field: $("#itemQty"), regEx: ITEM_QTY_REGEX});
i_vArray.push({field: $("#itemPrice"), regEx: ITEM_PRICE_REGEX});

function clearItemInputFields() {
    $("#itemID,#itemName,#itemQty,#itemPrice").val("");
    $("#itemID,#itemName,#itemQty,#itemPrice").css("border", "1px solid #ced4da");
    $("#itemID").focus();
}

$("#itemID,#itemName,#itemQty,#itemPrice").on("keydown keyup", function (e) {
    let indexNo = i_vArray.indexOf(i_vArray.find((i) => i.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkItemValidations(i_vArray[indexNo]);

    if (e.key == "Enter") {

        if (e.target.id != i_vArray[i_vArray.length - 1].field.attr("id")) {
            if (checkItemValidations(i_vArray[indexNo])) {
                i_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkItemValidations(i_vArray[indexNo])) {
                saveItem();
            
            }
        }
    }
});


function checkItemValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setItemBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }

}

function checkAllItem() {
    for (let i = 0; i < i_vArray.length; i++) {
        if (!checkItemValidations(i_vArray[i]))
         return false;
    }
    return true;
}

function setItemBtn() {
    $("#btnItemDelete").prop("disabled", true);
    $("#btnItemEdit").prop("disabled", true);

    if (checkAllItem()) {
        $("#btnItemSave").prop("disabled", false);
    } else {
        $("#btnItemSave").prop("disabled", true);
    }

    let id = $("#itemID").val();
    if (searchItem(id) == undefined) {
        $("#btnItemDelete").prop("disabled", true);
        $("#btnItemEdit").prop("disabled", true);
    } else {
        $("#btnItemDelete").prop("disabled", false);
        $("#btnItemEdit").prop("disabled", false);
    }

}