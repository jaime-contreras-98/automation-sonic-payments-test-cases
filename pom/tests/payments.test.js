import {URL, MESSAGES, CARDS, CREDENTIALS, SCENARIO, TEST_RESULT} from '../data/constants.js';
import LoginPage from '../pages/login-page.js';
import SideBarPage from '../pages/side-bar-page.js';
import ProductsPage from '../pages/products-page.js';
import SubscriptionPage from '../pages/subscription-page.js';
import RedirectPage from '../pages/redirect-page.js';
import StatusPage from '../pages/status-page.js';
import {createTestRun, updateTesCaseStatus} from "../data/testrail";


fixture("Payments test cases with Testcafe on local environment")
    .page `${URL.BASE_URL}`

    .before(async t=>{
        await createTestRun()
    })

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
    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.processPayment(CARDS.INVALID.NON_EXISTANT_CARD, null, null);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.NON_EXISTANT_CARD);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283915", "status": testStatus})
});

//INCOMPLETE CARD NUMBER - RESULT: number field incomplete
test("As a user I want to introduce an incomplete card number {incomplete}", async t=>{

    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.processPayment(CARDS.INVALID.INCOMPLETE_CARD, null, null);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.INCOMPLETE_CARD);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283916", "status": testStatus})

});

//INCOMPLETE EXPIRY NUMBER - RESULT: date field incomplete
test("As a user I want to introduce an incomplete expiry date number {incomplete}", async t=>{

    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.INCOMPLETE_EXP_DATE, null);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.INCOMPLETE_EXP_DATE);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283917", "status": testStatus})

});

//INCOMPLETE FIELDS - RESULT: incomplete field
test("As a user I want to process a payment clicking on betala button, letting all fields empty {incomplete} {negative}", async t=>{

    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await t.click(SubscriptionPage.paymentProcessButton);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.EMPTY_FIELDS);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283918", "status": testStatus})

});

// CVV DECLINED -  RESULT: 24:CVC Declined
test("As a user I want to process a payment with an invalid CVC code {refused}", async t=>{

    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.VALID.EXP_DATE, CARDS.INVALID.WRONG_CVV);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.CVC_DECLINED);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283919", "status": testStatus})


});

// CARD EXPIRED - RESULT: card too old
test("As a user I want to process a payment with an expired card with expiry date (JAN/22) {expired}", async t=>{

    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.JAN_EXP_DATE, null);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.OLD_EXPIRY_DATE);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283920", "status": testStatus})

});

// CARD EXPIRED - RESULT: Card too old
test("As a user I want to introduce an antique expiry date {expired}", async t=>{
    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.OLD_EXP_DATE, null);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.OLD_EXPIRY_DATE);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283921", "status": testStatus})
});

// CARD EXPIRED - RESULT: 6:Expired Card
test("As a user I want to process a payment with an expired card with expiry date (FEB/22) {expired}", async t=>{
    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.FEB_EXP_DATE, CARDS.VALID.CVV);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.EXPIRED_CARD);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283922", "status": testStatus})
});

// CARD EXPIRED - RESULT: 6:Expired Card
test("As a user I want to process a payment with an expired card with expiry date (MAR/22) {expired}", async t=>{
    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.MAR_EXP_DATE, CARDS.VALID.CVV);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.EXPIRED_CARD);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283923", "status": testStatus})
});

// CARD EXPIRED - RESULT: 6:Expired Card
test("As a user I want to process a payment with an expired card with expiry date (APR/22) {expired}", async t=>{
    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.APR_EXP_DATE, CARDS.VALID.CVV);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.EXPIRED_CARD);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283924", "status": testStatus})
});

// CARD REFUSED & EXPIRED - RESULT: 8:Refused Card
test("As a user I want to process a payment with an expired card with expiry date (MAY/22) {expired} {refused}", async t=>{
    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.MAY_EXP_DATE, CARDS.VALID.CVV);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.REFUSED);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283925", "status": testStatus})
});

// CARD EXPIRED - RESULT: Date too far in future
test("As a user I want to introduce a future expiry date {expired}", async t=>{
    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.INVALID.FUTURE_EXP_DATE, null);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.FUTURE_EXPIRY_DATE);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283926", "status": testStatus})
});

// PAYMENT SUCCESSFUL - RESULT: ACTIVE(Payment successful)
test("As a user I want to process a payment using valid card information {successful}",async t=>{
    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER, CARDS.VALID.EXP_DATE, CARDS.VALID.CVV);
        await t.expect(SubscriptionPage.statusPaymentLabel.innerText).eql(MESSAGES.SUCCESS.PAYMENT_STATUS);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283927", "status": testStatus})
});

// PAYMENT SUCCESSFUL CHALLENGE - RESULT: ACTIVE(Payment successful)
test("As a user I want to process a payment with valid challenge card information {challenge} {successful}",async t=>{
    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.challengeForm(SCENARIO.HAPPY.CHALLENGE);
        await t.expect(SubscriptionPage.statusPaymentLabel.innerText).eql(MESSAGES.SUCCESS.PAYMENT_STATUS);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283928", "status": testStatus})
});

// PAYMENT SUCCESSFUL IDENTIFY - RESULT: ACTIVE(Payment successful)
test("As a user I want to process a payment with valid redirect card information {identify} {successful}",async t=>{
    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.challengeForm(SCENARIO.HAPPY.IDENTIFY);
        await t.expect(SubscriptionPage.statusPaymentLabel.innerText).eql(MESSAGES.SUCCESS.PAYMENT_STATUS);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283929", "status": testStatus})
});

// PAYMENT SUCCESSFUL REDIRECT - RESULT: ACTIVE(Payment successful)
test("As a user I want to process a redirect payment with valid credentials {redirect} {successful}",async t=>{
    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.processPayment(CARDS.VALID.REDIRECT_CARD,CARDS.VALID.EXP_DATE,CARDS.VALID.CVV);
        await RedirectPage.redirectPayment(CREDENTIALS.USER,CREDENTIALS.PASSWORD);
        await t.expect(StatusPage.paymentStatusLabel.innerText).eql(MESSAGES.SUCCESS.PAYMENT_REDIRECT);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283930", "status": testStatus})
});

// REFUSED PAYMENT - RESULT: 2:Refused
test("As a user I want to process a payment with an invalid expiry date {refused}",async t=>{
    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER,CARDS.INVALID.WRONG_EXP_DATE_1,CARDS.VALID.CVV);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.REFUSED);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283931", "status": testStatus})
});

// REFUSED PAYMENT - RESULT: 24:CVC Declined
test("As a user I want to process a payment using a challenge card with an invalid expiry date {refused}",async t=>{
    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.challengeForm(SCENARIO.INVALID.CHALLENGE_CVV);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.CVC_DECLINED);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283932", "status": testStatus})
});

// REFUSED PAYMENT - RESULT: 6:Expired Card
test("As a user I want to process a payment using a redirect card with an invalid expiry date {refused}",async t=>{

    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.challengeForm(SCENARIO.INVALID.REDIRECT_REFUSED);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.EXPIRED_CARD);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283933", "status": testStatus})
});

// REFUSED PAYMENT IDENTIFY - RESULT: ACTIVE(Payment successful)
test("As a user I want to process a payment with valid redirect card information but invalid password {refused}",async t=>{
    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.challengeForm(SCENARIO.INVALID.CREDENTIALS);
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.FAILED_AUTH);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283934", "status": testStatus})
});

// REFUSED PAYMENT - RESULT: Error
test("As a user I want to process a redirect payment with invalid credentials {refused}",async t=>{
    let testStatus = TEST_RESULT.SUCCESS;
    try{
        await SubscriptionPage.processPayment(CARDS.VALID.REDIRECT_CARD,CARDS.VALID.EXP_DATE,CARDS.VALID.CVV);
        await RedirectPage.redirectPayment(CREDENTIALS.USER,CREDENTIALS.PASSWORD);
        await t.expect(StatusPage.paymentStatusLabel.innerText).eql(MESSAGES.SUCCESS.PAYMENT_REDIRECT);
    } catch (e) {
        testStatus = TEST_RESULT.FAILED
    }
    await updateTesCaseStatus( {"testCaseId" : "2283935", "status": testStatus})
});