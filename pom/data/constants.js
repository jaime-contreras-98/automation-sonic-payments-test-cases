export const URL = {
    BASE_URL: 'https://payment-e2e-tests-web:8080/#/'
};

export const CARDS = {
    VALID:{
        CARD_NUMBER : '4111 1111 1111 1111',
        REDIRECT_CARD : '4212 3456 7890 1237',
        CHALLENGE_CARD : '4212 3456 7891 0006',
        IDENTIFY_CARD : '4917 6100 0000 0000',
        EXP_DATE : '330',
        CVV: '737',
    },
    INVALID:{
        NON_EXISTANT_CARD : '4111 1111 1111 1111 111',
        INCOMPLETE_CARD : '4111 1111 1111 111',
        INCOMPLETE_EXP_DATE: '123',
        INCOMPLETE_CVV : '12',
        WRONG_EXP_DATE:'0222',
        WRONG_EXP_DATE_1: '0225',
        JAN_EXP_DATE: '0122',
        FEB_EXP_DATE: '0222',
        MAR_EXP_DATE: '0322',
        APR_EXP_DATE: '0422',
        MAY_EXP_DATE: '0522',
        OLD_EXP_DATE: '1010',
        FUTURE_EXP_DATE: '1053',
        WRONG_CVV : '123',
    }
}

export const MESSAGES = {
    ERROR: {
        CVC_DECLINED: '24:CVC Declined',
        REFUSED: '2:Refused',
        EXPIRED_CARD: '6:Expired Card',
        OLD_EXPIRY_DATE: 'Card too old',
        FUTURE_EXPIRY_DATE: 'Date too far in future',
        REDIRECT_FAILED : 'Error',
        NON_EXISTANT_CARD: 'luhn check failed',
        INCOMPLETE_CARD : 'number field incomplete',
        INCOMPLETE_EXP_DATE : 'date field incomplete',
        INCOMPLETE_CSC: 'csc field incomplete',
        EMPTY_FIELDS: 'incomplete field',
        FAILED_AUTH: '11:3D Not Authenticated'
    },
    SUCCESS: {
        PAYMENT_STATUS: 'ACTIVE',
        PAYMENT_REDIRECT: 'Success'
    }
}

export const CREDENTIALS = {
    USER: 'user',
    PASSWORD: 'password',
    FAKE_PASSWORD: '12345'
}

export const SCENARIO = {
    HAPPY:{
        CHALLENGE: "paymentChallenge",
        IDENTIFY: "paymentRedirect"
    },
    INVALID:{
        CREDENTIALS : "invalidCredentials",
        CHALLENGE_CVV: "invalidCVVChallenge",
        //
        //
        REDIRECT_REFUSED: "refusedCardRedirect"
    }
}