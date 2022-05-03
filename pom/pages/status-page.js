import {Selector} from "testcafe";

class StatusPage{

    constructor(){
        this.paymentStatusLabel = Selector(".MuiTypography-h5");
    }
}

export default new StatusPage();