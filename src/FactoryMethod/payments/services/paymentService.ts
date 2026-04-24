import { EPaymentGateway } from "../enums/paymentGateway";
import { PaymentFactory } from "../factory/paymentFactory"
import { PaymentGateway } from "../interfaces/paymentGateway";

export function processPayment(provider: EPaymentGateway, amount: number){
    const gateway: PaymentGateway = PaymentFactory.create(provider)
    gateway.pay(amount)
}

processPayment(EPaymentGateway.PAYPAL, 100)
processPayment(EPaymentGateway.RAZORPAY, 200)
processPayment(EPaymentGateway.STRIPE, 300)