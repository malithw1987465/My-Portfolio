getAllCustomers();
$("#Home").css("display","none");
$("#orders").css("display","none");
$("#item").css("display","none");
$("#btnCusSave").click(function(){
    if(checkAll()){
        saveCustomer();
        
    }else{
        alert("error");
    }
});

$("#btnViewAll").click(function(){
    getAllCustomers();
});

function bindTrEvents(){
    $("#tblCustomer>tr").click(function(){
        let id=$(this).children().eq(0).text();
        let name=$(this).children().eq(1).text();
        let age=$(this).children().eq(2).text();
        let tp=$(this).children().eq(3).text();
        let salary=$(this).children().eq(4).text();

        $("#customerID").val(id);
        $("#CustName").val(name);
        $("#custAge").val(age);
        $("#custTp").val(tp);
        $("#CustSalary").val(salary);

    });
}

$("#btnCusDelete").click(function(){
    let id=$('#customerID').val();

    let con=confirm("Do you want to delete this customer ?");

    if(con){
        let response=deleteCustomer(id);
        if(response){
            alert("Customer Deleted Successfully. ");
            clearCustomInputFields();
            getAllCustomers();
        }else{
            alert("Customer not deleted!!!!");
        }
    }
});

$("#btnCusEdit").click(function(){
    let id=$("#customerID").val();
    updateCustomer(id);
    clearCustomInputFields();
});

$("#btnCusClear").click(function(){
    clearCustomInputFields();
});

function saveCustomer(){
    let customerID=$("#customerID").val();
    if (searchCustomer(customerID.trim()) == undefined) {
        let customerName = $("#custName").val();
        let customerAge = $("#custAge").val();
        let custTP=$("#custTp").val();
        let customerSalary = $("#custSalary").val();

        let newCustomer = Object.assign({}, customer);

        newCustomer.id = customerID;
        newCustomer.name = customerName;
        newCustomer.age = customerAge;
        newCustomer.tp=custTP;
        newCustomer.salary = customerSalary;

        customerDB.push(newCustomer);
        clearCustomInputFields();
        getAllCustomers();
        enterCustomerIDS();

    } else {
        alert("Customer already exits.!");
        clearCustomInputFields();
    }
}

function getAllCustomers() {
    $("#tblCustomer").empty();

    for (let i = 0; i < customerDB.length; i++) {
        let id = customerDB[i].id;
        let name = customerDB[i].name;
        let custAge = customerDB[i].age;
        let custTp=customerDB[i].tp;
        let salary = customerDB[i].salary;

        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${custAge}</td>
                     <td>${custTp}</td>
                     <td>${salary}</td>
                    </tr>`;

        $("#tblCustomer").append(row);
        

        bindTrEvents();
    }
}

function deleteCustomer(id) {
    let custID=$("#customerID").val();
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == custID) {
            customerDB.splice(i,1);
            return true;
        }
        return false;
   
}
}

function searchCustomer(id) {
    return customerDB.find(function (customer) {
        return customer.id == id;
    });
}

function updateCustomer(id) {
    if (searchCustomer(id) == undefined) {
        alert("No such Customer..please check the ID");
    } else {
        let con = confirm("Do you really want to update this customer.?");
        if (con) {
            let customer = searchCustomer(id);

            let customerName = $("#custName").val();
            let customerAge = $("#custAge").val();
            let custTp=$("#custTp").val();
            let customerSalary = $("#custSalary").val();

            customer.name = customerName;
            customer.age = customerAge;
            customer.tp=custTp;
            customer.salary = customerSalary;

            getAllCustomers();
        }
    }

}