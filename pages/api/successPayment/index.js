import Payment from '../../../models/PaymentModel';
import dbConnect from '../../../utilities/mongoose';

export default async function handler(req, res) {
    const user = localStorage.getItem('signedInUser')
    const { method } = req;

    await dbConnect()

    if (method === "POST") {
        try {
            const successData = req.body;
            const userPaymentInfo = {successData , userEmail : user?.email}
            

            const saveData = await Payment.create(userPaymentInfo);

            // Redirect to the success payment page
            res.redirect(302, '/successPayment');
            // res.writeHead(302, { Location: "https://radiant-academy-ius.vercel.app" });
        } catch (error) {
            console.log('pay', error);

            res.status(500).json({ success: false, error: error.message });
        }
    }


}