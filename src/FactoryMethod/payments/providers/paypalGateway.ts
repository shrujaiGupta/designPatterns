import { IPaymentGateway } from "../interfaces/paymentGateway"
import { EPaymentGateway } from "../enums/paymentGateway"

export class Paypal implements IPaymentGateway{
    pay(amount : number): void{
        console.log(`Amount of rs. ${amount} is paid successfully from ${EPaymentGateway.PAYPAL} gateway!`)
    }
}