import Payment from '../../../models/PaymentModel';
import dbConnect from '../../../utilities/mongoose';
import User from '../../../models/UserModel';
import Course from '../../../models/CourseModel';




export default async function handler(req, res) {
    const { method } = req;

    await dbConnect()

    if (method === "POST") {
        try {
            const paymentResponse = req.body;

            // Update the payment record with additional details
            const updatedPayment = await Payment.findOneAndUpdate(
                { tran_id: paymentResponse.tran_id }, // Find by transaction ID
                {
                    val_id: paymentResponse.val_id,
                    card_type: paymentResponse.card_type,
                    store_amount: paymentResponse.store_amount,
                    bank_tran_id: paymentResponse.bank_tran_id,
                    status: paymentResponse.status,
                    card_issuer: paymentResponse.card_issuer,
                    card_brand: paymentResponse.card_brand,
                    risk_level: paymentResponse.risk_level,
                    risk_title: paymentResponse.risk_title,
                },
                { new: true } // Return the updated document
            );

            const userInfo = await Payment.findOne({ tran_id: paymentResponse.tran_id })
            const userEmail = userInfo?.cus_email;
            const newPurchaseCourse = userInfo?.purchaseCourse;

            const filter = { email: userEmail };
            const update = {
                $push: {
                    enrolledCourses: {
                        $each: newPurchaseCourse.map(courseId => ({ courseId })), // Push each courseId as an object
                    },
                },
            };

            // TODO increse enroll count
            // const enrollIncrease = 

            try {
                const updatedUser = await User.findOneAndUpdate(filter, update, { new: true });
            } catch (error) {
            }


            res.redirect(302, '/successPayment');
            res.status(200).json({ success: 'success', res: updatedPayment });

        } catch (error) {
            console.log('pay', error);

            res.status(500).json({ success: false, error: error.message });
        }
    }



}