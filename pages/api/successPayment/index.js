import SuccessPayment from '../../../components/SuccessPayment/SuccessPayment';
import Payment from '../../../models/PaymentModel';
import dbConnect from '../../../utilities/mongoose';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect()

    if (method === "POST") {
        try {
            const successData = req.body;

            const saveData = await Payment.create(successData);


            // Redirect to the success payment page
            res.redirect(302, '/successPayment');
            // res.writeHead(302, { Location: "https://radiant-academy-ius.vercel.app" });
        } catch (error) {
            console.log('pay', error);

            res.status(500).json({ success: false, error: error.message });
        }
    }


}