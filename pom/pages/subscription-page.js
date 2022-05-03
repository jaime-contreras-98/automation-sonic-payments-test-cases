import {Selector, t} from "testcafe";

class SubscriptionPage{

    constructor(){
        this.cardNumberInput = Selector("#encryptedCardNumber");
        this.cardExpiryDateInput = Selector("#encryptedExpiryDate");
        this.cardCVVInput = Selector("#encryptedSecurityCode");
        this.paymentProcessButton = Selector(".adyen-checkout__button");
        this.errorMessageLabel = Selector('div').withAttribute('class','MuiAlert-message');
        this.statusPaymentLabel = Selector('td:nth-child(2)');
        this.cardNumberIframe = Selector("span.adyen-checkout__card__cardNumber__input iframe");
        this.cardExpiryDateIframe = Selector("span.adyen-checkout__card__exp-date__input iframe");
        this.cardCVVIframe = Selector("span.adyen-checkout__card__cvc__input iframe");
    }

    async processPayment(cardNumber,cardExpiryDate,cardCVV){
        await t
            .switchToIframe(this.cardNumberIframe)
            .typeText(this.cardNumberInput,cardNumber)
            .switchToMainWindow()
            .switchToIframe(this.cardExpiryDateIframe)
            .typeText(this.cardExpiryDateInput,cardExpiryDate)
            .switchToMainWindow()
            .switchToIframe(this.cardCVVIframe)
            .typeText(this.cardCVVInput,cardCVV)
            .switchToMainWindow()
            .click(this.paymentProcessButton)
    }

}

export default new SubscriptionPage();