import {Selector,t} from "testcafe";

class RedirectPage{

    constructor(){
        this.user3dsInput = Selector("#username");
        this.password3dsInput = Selector("#password");
        this.submit3dsButton = Selector(".paySubmit")
    }

    async redirectPayment(user,password){
        await t 
            .typeText(this.user3dsInput, user)
            .typeText(this.password3dsInput, password)
            .click(this.submit3dsButton)
    }   
}

export default new RedirectPage();