import { PaymentGateway } from "../interfaces/paymentGateway"
import { EPaymentGateway } from "../enums/paymentGateway"
import { Paypal } from "../providers/paypalGateway"
import { Razorpay } from "../providers/razorpayGateway"
import { Stripe } from "../providers/stripeGateway"
export class PaymentFactory {
    static create(provider : EPaymentGateway): PaymentGateway{
        if(provider === EPaymentGateway.PAYPAL){
            return new Paypal()
        }
        else if(provider === EPaymentGateway.RAZORPAY){
            return new Razorpay()
        }
        else if(provider === EPaymentGateway.STRIPE){
            return new Stripe()
        }

        throw new Error("Unsupported Gateway Provider!")
    }
}