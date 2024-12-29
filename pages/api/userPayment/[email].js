import dbConnect from '../../../utilities/mongoose';
import Payment from '../../../models/PaymentModel';

export default async function handler(req, res) {
    const { method, query } = req;

    // Connect to the database
    await dbConnect();

    if (method === 'GET') {
        const { email } = query; // Access dynamic route parameter
        try {
            console.log('Fetching payment data for:', email);
            const payments = await Payment.find({ cus_email: email }); // Query the database
            res.status(200).json({ success: true, data: payments });
        } catch (error) {
            console.error('Error fetching payments:', error);
            res.status(500).json({ success: false, message: 'Failed to fetch payment data' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
