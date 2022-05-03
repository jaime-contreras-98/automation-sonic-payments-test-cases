import {Selector} from "testcafe";

class SideBarPage{

    constructor(){
        this.buyElement = Selector(".MuiListItem-root").withText("Buy");
    }

}

export default new SideBarPage();