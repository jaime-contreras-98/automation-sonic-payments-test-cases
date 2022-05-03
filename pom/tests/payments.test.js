import {URL,MESSAGES,CARDS,CREDENTIALS} from '../data/constants.js';
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
        t.wait(3000);
    });

    test("As a user I want to process a payment with an invalid CVC code {regression}", async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER,CARDS.VALID.EXP_DATE,CARDS.INVALID.WRONG_CVV);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.CVC_DECLINED);
    });

    test("As a user I want to process a payment with an expired card {regression}", async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER,CARDS.INVALID.WRONG_EXP_DATE,CARDS.VALID.CVV);

        await t.expect(SubscriptionPage.errorMessageLabel.innerText).contains(MESSAGES.ERROR.EXPIRED_CARD);
    });

    test("As a user I want to process a payment with a valid card {regression}",async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.CARD_NUMBER,CARDS.VALID.EXP_DATE,CARDS.VALID.CVV);
        
        await t.expect(SubscriptionPage.statusPaymentLabel.innerText).eql(MESSAGES.SUCCESS.PAYMENT_STATUS);
    });
    
    test("As a user I want to process a redirect payment with a valid card {regression}",async t=>{
        await SubscriptionPage.processPayment(CARDS.VALID.REDIRECT_CARD,CARDS.VALID.EXP_DATE,CARDS.VALID.CVV);
        await RedirectPage.redirectPayment(CREDENTIALS.REDIRECT.USER,CREDENTIALS.REDIRECT.PASSWORD);

        await t.expect(StatusPage.paymentStatusLabel.innerText).eql(MESSAGES.SUCCESS.PAYMENT_REDIRECT);
    })

