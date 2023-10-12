export var item = {
    code : '',
    name: '',
    price : '',
    quantity : '',

    addValue(code, name, price, quantity) {
        this.code += code;
        this.name += name;
        this.price += price;
        this.quantity += quantity;
    }
}