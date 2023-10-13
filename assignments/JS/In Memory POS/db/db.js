var customerDB = [
    {id: "C00-001", name: "Sachin Thamalsha", age: "21",tp: "0743157372", salary: 100000},
    {id: "C00-002", name: "Ranjith Perera", age: "21",tp: "0743157372", salary: 200000},
    {id: "C00-003", name: "Kavindu Perera", age: "21",tp: "0743157372", salary: 300000}
];

var itemDB = [
    {id:"I00-001",name:"Lux",qtyOnHand: 100,unitPrice: 145.00},
    {id:"I00-002",name:"Sunlight",qtyOnHand: 150,unitPrice: 345.00},
    {id:"I00-003",name:"Light Boy",qtyOnHand: 400,unitPrice: 245.00}
];


var orderDB = [
    {oid:"OID-001", date:"2023/10/06", customerID:"C00-001",
        orderDetails:[
            {oid:"OID-001", code:"I00-001", qty:10, unitPrice:145.00},
            {oid:"OID-001", code:"I00-002", qty:2, unitPrice:345.00}
        ]
    }
];