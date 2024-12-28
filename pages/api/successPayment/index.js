import Payment from '../../../models/PaymentModel';
import dbConnect from '../../../utilities/mongoose';

// const user = localStorage.getItem('signedInUser')
    // const thisUser = useSelector((state) => state?.loginUser?.loginUser)


export default async function handler(req, res) {
    const { method } = req;

    await dbConnect()

    if (method === "POST") {
        try {
            const successData = req.body;
            
            // TODO : UPDATE PAYMENT STATAS TRUE

            const saveData = await Payment.create(successData );
            res.redirect(302, '/successPayment');
            res.status(200).json({ success: 'success', res: successData });
            // res.writeHead(302, { Location: "https://radiant-academy-ius.vercel.app" });
        } catch (error) {
            console.log('pay', error);

            res.status(500).json({ success: false, error: error.message });
        }
    }
  


}