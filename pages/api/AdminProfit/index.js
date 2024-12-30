import Payment from '../../../models/PaymentModel';
import dbConnect from '../../../utilities/mongoose';

export default async function handler(req , res) {
    const {method} = req

    await dbConnect()

    if(method === 'GET'){
        try{

            const receivePayment = await Payment.find()
            res.json(receivePayment)
        }
        catch(err){

        }
    }

}