import {Selector, t} from "testcafe";

class SubscriptionPage{

    constructor(){
        this.cardNumberInput = Selector("#encryptedCardNumber");
        this.cardExpiryDateInput = Selector("#encryptedExpiryDate");
        this.cardCVVInput = Selector("#encryptedSecurityCode");
        this.paymentProcessButton = Selector(".adyen-checkout__button");
        this.errorMessageLabel = Selector('.MuiAlert-message');
        this.statusPaymentLabel = Selector('td:nth-child(2)');
        this.cardNumberIframe = Selector("span.adyen-checkout__card__cardNumber__input iframe");
        this.cardExpiryDateIframe = Selector("span.adyen-checkout__card__exp-date__input iframe");
        this.cardCVVIframe = Selector("span.adyen-checkout__card__cvc__input iframe");
    }

    async processPayment(cardNumber,cardExpiryDate,cardCVV){
        //await t.switchToIframe(this.cardNumberIframe);
        cardNumber != null ? await t.switchToIframe(this.cardNumberIframe) 
            .typeText(this.cardNumberInput,cardNumber) 
            .switchToMainWindow() 
            .switchToIframe(this.cardExpiryDateIframe) 
            : console.log('card number is null!');
        cardExpiryDate != null? await t.typeText(this.cardExpiryDateInput,cardExpiryDate) 
            .switchToMainWindow() 
            .switchToIframe(this.cardCVVIframe) 
            : await t.switchToMainWindow();
        cardCVV != null ? await t.typeText(this.cardCVVInput,cardCVV) 
            .switchToMainWindow() 
            .switchToIframe(this.cardCVVIframe) 
            : await t.switchToMainWindow();
            
        if(cardNumber!=null && cardExpiryDate!=null && cardCVV!=null){
            await t
                .switchToMainWindow() 
                .click(this.paymentProcessButton);
        }
    }
}

export default new SubscriptionPage();