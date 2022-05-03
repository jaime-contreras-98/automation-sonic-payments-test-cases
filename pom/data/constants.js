export const URL = {
    BASE_URL: 'https://payment-e2e-tests-web:8080/#/'
};

export const CARDS = {
    VALID:{
        CARD_NUMBER : '4111 1111 1111 1111',
        REDIRECT_CARD : '4212 3456 7890 1237',
        EXP_DATE : '330',
        CVV: '737',
    },
    INVALID:{
        WRONG_EXP_DATE:'0222',
        WRONG_CVV : '123' 
    }
}

export const MESSAGES = {
    ERROR: {
        CVC_DECLINED: '24:CVC Declined',
        EXPIRED_CARD: '6:Expired Card'
    },
    SUCCESS: {
        PAYMENT_STATUS: 'ACTIVE',
        PAYMENT_REDIRECT: 'Success'
    }
}

export const CREDENTIALS = {
    REDIRECT:{
        USER: 'user',
        PASSWORD: 'password'
    }
}