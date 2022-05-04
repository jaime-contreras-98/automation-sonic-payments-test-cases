import {URL,MESSAGES,CARDS,CREDENTIALS} from '../data/constants.js';
import LoginPage from '../pages/login-page.js';
import SideBarPage from '../pages/side-bar-page.js';
import ProductsPage from '../pages/products-page.js';
import SubscriptionPage from '../pages/subscription-page.js';
import RedirectPage from '../pages/redirect-page.js';
import StatusPage from '../pages/status-page.js';

fixture("Payments negative test cases with Testcafe on local environment")
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

    test.skip("As a user I want to process a payment with an invalid CVC code {negative}", async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER,CARDS.VALID.EXP_DATE,CARDS.INVALID.WRONG_CVV);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.CVC_DECLINED);
    });

    test.skip("As a user I want to process a payment with an expired card {negative}", async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER,CARDS.INVALID.WRONG_EXP_DATE,CARDS.VALID.CVV);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.EXPIRED_CARD);
    });

    test.skip("As a user I want to introduce an antique expiry date {negative}", async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER,CARDS.INVALID.OLD_EXP_DATE,null);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.OLD_EXPIRY_DATE);
    });

    test.skip("As a user I want to introduce a future expiry date {negative}", async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER,CARDS.INVALID.FUTURE_EXP_DATE,null);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.FUTURE_EXPIRY_DATE);
    });

    test.skip("As a user I want to process a payment with a valid card {positive}",async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER,CARDS.VALID.EXP_DATE,CARDS.VALID.CVV);
        
        await t.expect(SubscriptionPage.statusPaymentLabel.innerText).eql(MESSAGES.SUCCESS.PAYMENT_STATUS);
    });

    test.skip("As a user I want to process a payment with invalid parameters {regression}",async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER,CARDS.INVALID.WRONG_EXP_DATE_1,CARDS.VALID.CVV);
        
        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.REFUSED);
    })
    
    test("As a user I want to process a redirect payment with invalid credentials {negative}",async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.REDIRECT_CARD,CARDS.VALID.EXP_DATE,CARDS.VALID.CVV);
        await RedirectPage.redirectPayment("hello",CREDENTIALS.REDIRECT.PASSWORD);

        await t.expect(StatusPage.paymentStatusLabel.innerText).eql(MESSAGES.SUCCESS.PAYMENT_REDIRECT);
    });