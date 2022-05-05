import {Selector, t} from "testcafe";
import {CARDS,SCENARIO,CREDENTIALS} from '../data/constants.js';

class SubscriptionPage{

    constructor(){
        this.cardNumberInput = Selector("#encryptedCardNumber");
        this.cardExpiryDateInput = Selector("#encryptedExpiryDate");
        this.cardCVVInput = Selector("#encryptedSecurityCode");
        this.cardChallengeDiv = Selector("#simulatorDescription");
        this.cardChallengeInput = Selector("input").withAttribute("class","input-field");
        this.cardChallengeSubmitButton = Selector("#buttonSubmit");
        this.paymentProcessButton = Selector(".adyen-checkout__button");
        this.errorMessageLabel = Selector('.MuiAlert-message');
        this.statusPaymentLabel = Selector('td:nth-child(2)');
        this.cardNumberIframe = Selector("span.adyen-checkout__card__cardNumber__input iframe");
        this.cardExpiryDateIframe = Selector("span.adyen-checkout__card__exp-date__input iframe");
        this.cardCVVIframe = Selector("span.adyen-checkout__card__cvc__input iframe");
        this.cardChallengeIframe = Selector("div.adyen-checkout__threeds2__challenge--05 iframe");
    }

    async processPayment(cardNumber,cardExpiryDate,cardCVV){
        cardNumber != null ? await t.switchToIframe(this.cardNumberIframe) 
            .typeText(this.cardNumberInput,cardNumber) 
            .switchToMainWindow() 
            .switchToIframe(this.cardExpiryDateIframe)
            : await t.switchToMainWindow();
        cardExpiryDate != null? await t.typeText(this.cardExpiryDateInput,cardExpiryDate) 
            .switchToMainWindow() 
            .switchToIframe(this.cardCVVIframe) 
            : await t.switchToMainWindow() 
        cardCVV != null ? await t.typeText(this.cardCVVInput,cardCVV) 
            .switchToMainWindow() 
            .switchToIframe(this.cardCVVIframe) 
            : await t.switchToMainWindow();

        await t.pressKey("tab");
            
        if(cardNumber!=null && cardExpiryDate!=null && cardCVV!=null){
            await t.switchToMainWindow() .click(this.paymentProcessButton);
        }
    }

    async challengeForm(parameter){
        switch(parameter){
            case SCENARIO.HAPPY.CHALLENGE:
                await this.processPayment(CARDS.VALID.CHALLENGE_CARD, CARDS.VALID.EXP_DATE, CARDS.VALID.CVV);
                await this.challengePaymentProcess(CREDENTIALS.PASSWORD);
                break;

            case SCENARIO.HAPPY.IDENTIFY:
                await this.processPayment(CARDS.VALID.IDENTIFY_CARD, CARDS.VALID.EXP_DATE, CARDS.VALID.CVV);
                await this.challengePaymentProcess(CREDENTIALS.PASSWORD);
                break;

            case SCENARIO.INVALID.CHALLENGE_CVV:
                await this.processPayment(CARDS.VALID.CHALLENGE_CARD, CARDS.VALID.EXP_DATE, CARDS.INVALID.WRONG_CVV);
                await this.challengePaymentProcess(CREDENTIALS.PASSWORD);
                break;

            case "invalidCVVRedirect":
                await this.processPayment(CARDS.VALID.CHALLENGE_CARD, CARDS.VALID.EXP_DATE, CARDS.VALID.CVV);
                await this.challengePaymentProcess(CREDENTIALS.PASSWORD);
                break;
            
            case "refusedCardChallenge":
                await this.processPayment(CARDS.VALID.CHALLENGE_CARD, CARDS.VALID.EXP_DATE, CARDS.VALID.CVV);
                await this.challengePaymentProcess(CREDENTIALS.PASSWORD);
                break;

            case SCENARIO.INVALID.REDIRECT_REFUSED :
                await this.processPayment(CARDS.VALID.CHALLENGE_CARD, CARDS.INVALID.FEB_EXP_DATE, CARDS.VALID.CVV);
                await this.challengePaymentProcess(CREDENTIALS.PASSWORD);
                break;

            case SCENARIO.INVALID.CREDENTIALS:
                await this.processPayment(CARDS.VALID.CHALLENGE_CARD, CARDS.VALID.EXP_DATE, CARDS.VALID.CVV);
                await this.challengePaymentProcess(CREDENTIALS.FAKE_PASSWORD);
                break;

            default:
                console.log("Choose a valid option..."); 
        }
    }

    async challengePaymentProcess(challengePassword){
        await t.switchToIframe(this.cardChallengeIframe);
        challengePassword === CREDENTIALS.PASSWORD ? await t.typeText(this.cardChallengeInput,CREDENTIALS.PASSWORD) : await t.typeText(this.cardChallengeInput,challengePassword);
        await t.click(this.cardChallengeSubmitButton) .switchToMainWindow(); 
    }
}

export default new SubscriptionPage();