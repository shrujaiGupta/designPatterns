import { EPaymentGateway } from "../enums/paymentGateway";
import { paymentFactory } from "../factory/paymentFactory"
import { PaymentGateway } from "../interfaces/paymentGateway";

export function processPayment(provider: EPaymentGateway, amount: number){
    const gateway: PaymentGateway = paymentFactory.create(provider)
    gateway.pay(amount)
}

processPayment(EPaymentGateway.PAYPAL, 100)
processPayment(EPaymentGateway.RAZORPAY, 200)
processPayment(EPaymentGateway.STRIPE, 300)