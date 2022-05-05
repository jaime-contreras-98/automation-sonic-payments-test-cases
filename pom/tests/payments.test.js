import {URL,MESSAGES,CARDS,CREDENTIALS,SCENARIO} from '../data/constants.js';
import LoginPage from '../pages/login-page.js';
import SideBarPage from '../pages/side-bar-page.js';
import ProductsPage from '../pages/products-page.js';
import SubscriptionPage from '../pages/subscription-page.js';
import RedirectPage from '../pages/redirect-page.js';
import StatusPage from '../pages/status-page.js';

fixture("Payments test cases with Testcafe on local environment")
    .page `${URL.BASE_URL}`

    .beforeEach(async t=>{
        await t.maximizeWindow();
        await LoginPage.setUpEnvironment();
        await t.click(LoginPage.registerButton);
        await t.click(SideBarPage.buyElement);
        await t.click(ProductsPage.dayAdyenCheckoutButton);
        await t.eval(() => location.reload(true));
    })

    .afterEach(async t=>{
        await t.wait(3000);
    });

    //NON-EXISTENT CARD - RESULT: luhn check failed
    test("As a user I want to introduce a card that does not exists {negative}", async t=>{
        await SubscriptionPage.processPayment(CARDS.INVALID.NON_EXISTANT_CARD, null, null);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.NON_EXISTANT_CARD);
    });

    //INCOMPLETE CARD NUMBER - RESULT: number field incomplete
    test("As a user I want to introduce an incomplete card number {incomplete}", async t=>{
        await SubscriptionPage.processPayment(CARDS.INVALID.INCOMPLETE_CARD, null, null);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.INCOMPLETE_CARD);
    });

    //INCOMPLETE EXPIRY NUMBER - RESULT: date field incomplete
    test("As a user I want to introduce an incomplete expiry date number {incomplete}", async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.INCOMPLETE_EXP_DATE, null);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.INCOMPLETE_EXP_DATE);
    });

    //INCOMPLETE FIELDS - RESULT: incomplete field
    test("As a user I want to process a payment clicking on betala button, letting all fields empty {incomplete} {negative}", async t=>{
        await t.click(SubscriptionPage.paymentProcessButton);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.EMPTY_FIELDS);
    });

    // CVV DECLINED -  RESULT: 24:CVC Declined 
    test("As a user I want to process a payment with an invalid CVC code {refused}", async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.VALID.EXP_DATE, CARDS.INVALID.WRONG_CVV);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.CVC_DECLINED);
    });

    // CARD EXPIRED - RESULT: card too old
    test("As a user I want to process a payment with an expired card with expiry date (JAN/22) {expired}", async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.JAN_EXP_DATE, null);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.OLD_EXPIRY_DATE);
    });

    // CARD EXPIRED - RESULT: Card too old
    test("As a user I want to introduce an antique expiry date {expired}", async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.OLD_EXP_DATE, null);
    
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.OLD_EXPIRY_DATE);
    });

    // CARD EXPIRED - RESULT: 6:Expired Card
    test("As a user I want to process a payment with an expired card with expiry date (FEB/22) {expired}", async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.FEB_EXP_DATE, CARDS.VALID.CVV);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.EXPIRED_CARD);
    });

    // CARD EXPIRED - RESULT: 6:Expired Card
    test("As a user I want to process a payment with an expired card with expiry date (MAR/22) {expired}", async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.MAR_EXP_DATE, CARDS.VALID.CVV);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.EXPIRED_CARD);
    });

    // CARD EXPIRED - RESULT: 6:Expired Card 
    test("As a user I want to process a payment with an expired card with expiry date (APR/22) {expired}", async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.APR_EXP_DATE, CARDS.VALID.CVV);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.EXPIRED_CARD);
    });

    // CARD REFUSED & EXPIRED - RESULT: 8:Refused Card
    test("As a user I want to process a payment with an expired card with expiry date (MAY/22) {expired} {refused}", async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.MAY_EXP_DATE, CARDS.VALID.CVV);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.REFUSED);
    });

    // CARD EXPIRED - RESULT: Date too far in future 
    test("As a user I want to introduce a future expiry date {expired}", async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.FUTURE_EXP_DATE, null);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.FUTURE_EXPIRY_DATE);
    });

    // PAYMENT SUCCESSFUL - RESULT: ACTIVE(Payment successful)  
    test("As a user I want to process a payment using valid card information {successful}",async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.VALID.EXP_DATE, CARDS.VALID.CVV);
        
        await t.expect(SubscriptionPage.statusPaymentLabel.innerText).eql(MESSAGES.SUCCESS.PAYMENT_STATUS);
    });

    // PAYMENT SUCCESSFUL CHALLENGE - RESULT: ACTIVE(Payment successful)
    test("As a user I want to process a payment with valid challenge card information {challenge} {successful}",async t=>{
        await SubscriptionPage.challengeForm(SCENARIO.HAPPY.CHALLENGE);
        
        await t.expect(SubscriptionPage.statusPaymentLabel.innerText).eql(MESSAGES.SUCCESS.PAYMENT_STATUS);
    });

    // PAYMENT SUCCESSFUL IDENTIFY - RESULT: ACTIVE(Payment successful)  
    test("As a user I want to process a payment with valid redirect card information {identify} {successful}",async t=>{
        await SubscriptionPage.challengeForm(SCENARIO.HAPPY.IDENTIFY);
        
        await t.expect(SubscriptionPage.statusPaymentLabel.innerText).eql(MESSAGES.SUCCESS.PAYMENT_STATUS);
    });

    // PAYMENT SUCCESSFUL REDIRECT - RESULT: ACTIVE(Payment successful) 
    test("As a user I want to process a redirect payment with valid credentials {redirect} {successful}",async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.REDIRECT_CARD,CARDS.VALID.EXP_DATE,CARDS.VALID.CVV);
        await RedirectPage.redirectPayment(CREDENTIALS.USER,CREDENTIALS.PASSWORD);

        await t.expect(StatusPage.paymentStatusLabel.innerText).eql(MESSAGES.SUCCESS.PAYMENT_REDIRECT);
    });

    // REFUSED PAYMENT - RESULT: 2:Refused 
    test("As a user I want to process a payment with an invalid expiry date {refused}",async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER,CARDS.INVALID.WRONG_EXP_DATE_1,CARDS.VALID.CVV);
        
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.REFUSED);
    });

    // REFUSED PAYMENT - RESULT: 24:CVC Declined 
    test("As a user I want to process a payment using a challenge card with an invalid expiry date {refused}",async t=>{
        await SubscriptionPage.challengeForm(SCENARIO.INVALID.CHALLENGE_CVV);
            
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.CVC_DECLINED);
    });

    // REFUSED PAYMENT - RESULT: 6:Expired Card
    test("As a user I want to process a payment using a redirect card with an invalid expiry date {refused}",async t=>{
        await SubscriptionPage.challengeForm(SCENARIO.INVALID.REDIRECT_REFUSED);
                
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.EXPIRED_CARD);
    });

    // REFUSED PAYMENT IDENTIFY - RESULT: ACTIVE(Payment successful) 
    test("As a user I want to process a payment with valid redirect card information but invalid password {refused}",async t=>{
        await SubscriptionPage.challengeForm(SCENARIO.INVALID.CREDENTIALS);
                
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.FAILED_AUTH);
    });
    
    // REFUSED PAYMENT - RESULT: Error
    test("As a user I want to process a redirect payment with invalid credentials {refused}",async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.REDIRECT_CARD,CARDS.VALID.EXP_DATE,CARDS.VALID.CVV);
        await RedirectPage.redirectPayment(CREDENTIALS.USER,CREDENTIALS.PASSWORD);

        await t.expect(StatusPage.paymentStatusLabel.innerText).eql(MESSAGES.SUCCESS.PAYMENT_REDIRECT);
    });