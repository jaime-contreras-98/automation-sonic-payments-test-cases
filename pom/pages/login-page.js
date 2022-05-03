import {Selector, t} from "testcafe";

class LoginPage{

    constructor(){
        //this.usernameInput = Selector("#reg-username-input");
        this.realmDropdown = Selector("#mui-component-select-realm");
        this.environmentDropdown = Selector("#mui-component-select-url");
        this.dplayseElement = Selector(".MuiListItem-root").withText("dplayse");
        this.sonicTestElement = Selector(".MuiListItem-root").withText("sonic-test.disco-api");
        this.nextButton = Selector("#next-button");
        this.registerButton = Selector("#register-button");
    }

    async setUpEnvironment(){
        await t
            .click(this.realmDropdown)
            .click(this.dplayseElement)
            .click(this.environmentDropdown)
            .click(this.sonicTestElement)
            .click(this.nextButton);
    }
}

export default new LoginPage();