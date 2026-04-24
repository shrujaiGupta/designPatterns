import { PaymentGateway } from "../interfaces/paymentGateway";
import { EPaymentGateway } from "../enums/paymentGateway"

export class Stripe implements PaymentGateway{
    pay(amount : number): void{
        console.log(`Amount of rs. ${amount} is paid successfully from ${EPaymentGateway.STRIPE} gateway!`)
    }
}