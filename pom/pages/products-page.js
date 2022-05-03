import {Selector} from "testcafe";

class ProductsPage{

    constructor(){
        this.dayAdyenCheckoutButton = Selector(".MuiButton-root").withText("CHECKOUT");
    }
}

export default new ProductsPage();