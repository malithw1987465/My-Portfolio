const CUS_ID_REGEX = /^(C00-)[0-9]{3}$/;
const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_AGE_REGEX = /^([1-9]?\d|100)$/;
const CUS_TP_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const CUS_SALARY_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

//add validations and text fields to the
let c_vArray = new Array();
c_vArray.push({field: $("#customerID"), regEx: CUS_ID_REGEX});
c_vArray.push({field: $("#custName"), regEx: CUS_NAME_REGEX});
c_vArray.push({field: $("#custAge"), regEx: CUS_AGE_REGEX});
c_vArray.push({field: $("#custTp"), regEx: CUS_TP_REGEX});
c_vArray.push({field: $("#custSalary"), regEx: CUS_SALARY_REGEX});

function clearCustomInputFields() {
    $("#customerID,#custName,#custAge,#custTp,#custSalary").val("");
    $("#customerID,#custName,#custAge,#custTp,#custSalary").css("border", "1px solid #ced4da");
    $("#customerID").focus();
}

$("#customerID,#custName,#custAge,#custTp,#custSalary").on("keydown keyup", function (e) {
    let indexNo = c_vArray.indexOf(c_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidations(c_vArray[indexNo]);

    if (e.key == "Enter") {

        if (e.target.id != c_vArray[c_vArray.length - 1].field.attr("id")) {
            if (checkValidations(c_vArray[indexNo])) {
                c_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(c_vArray[indexNo])) {
                saveCustomer();
            }
        }
    }
});


function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {
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

function checkAll() {
    for (let i = 0; i < c_vArray.length; i++) {
        if (!checkValidations(c_vArray[i])) return false;
    }
    return true;
}

function setBtn() {
    $("#btnCusDelete").prop("disabled", true);
    $("#btnCusEdit").prop("disabled", true);

    if (checkAll()) {
        $("#btnCusSave").prop("disabled", false);
    } else {
        $("#btnCusSave").prop("disabled", true);
    }

    let id = $("#customerID").val();
    if (searchCustomer(id) == undefined) {
        $("#btnCusDelete").prop("disabled", true);
        $("#btnCusEdit").prop("disabled", true);
    } else {
        $("#btnCusDelete").prop("disabled", false);
        $("#btnCusEdit").prop("disabled", false);
    }

}