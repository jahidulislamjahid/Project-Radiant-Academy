import Payment from '../../../models/PaymentModel';
import dbConnect from '../../../utilities/mongoose';

export default async function handler(req, res) {
    const { method } = req; 

    await dbConnect()

    if (method === "POST") {
    
        try {
           const successData = req.body
           const saveData = await Payment.create(successData)
            res.status(200).json({ success: true, data: saveData })

        } catch (error) {
            res.status(500).json({ success: false , error: error});
        }
    }

}