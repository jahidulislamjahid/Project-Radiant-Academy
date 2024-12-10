import axios from 'axios';
import dbConnect from '../../../utilities/mongoose';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    if (method === "POST") {
        const paymentInfo = req.body;
        const date = Date.now()
        const initiatePaymentData = {
            store_id: "radia6745d56280b3c",
            store_passwd: "radia6745d56280b3c@ssl",
            total_amount: paymentInfo?.ammont || "0", // Default value if ammont is undefined
            currency: "BDT",
            tran_id: paymentInfo?.ammont + date, // Replace with a unique transaction ID
            success_url: "http://localhost:3000/api/successPayment", // Replace with the actual URL
            fail_url: "http://localhost:3000/api/failPayment", // Replace with the actual URL
            cancel_url: "http://localhost:3000/api/cancelPayment", // Replace with the actual URL
            cus_name: paymentInfo?.cus_name || "Customer Name",
            cus_email: paymentInfo?.cus_email || "customer@example.com",
            cus_add1: paymentInfo?.cus_add1 || "Customer Address 1",
            cus_add2: paymentInfo?.cus_add2 || "",
            cus_city: paymentInfo?.cus_city || "City",
            cus_state: paymentInfo?.cus_state || "State",
            cus_postcode: paymentInfo?.cus_postcode || "1000",
            cus_country: paymentInfo?.cus_country || "Bangladesh",
            cus_phone: paymentInfo?.cus_phone || "01711111111",
            cus_fax: paymentInfo?.cus_fax || "",
            shipping_method: 'NO',
            multi_card_name: "",
            value_a: "",
            value_b: "",
            value_c: "",
            value_d: "",
            product_name: 'Course',
            product_category: 'general',
            product_profile: 'education'
        };

        try {
            const response = await axios({
                method: 'POST',
                url: 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' // Ensures data is URL-encoded
                },
                data: new URLSearchParams(initiatePaymentData).toString() // Converts the object to URL-encoded format
            });

            res.status(200).json({ success: true, data: response.data });

        } catch (error) {
            console.error(error.response?.data || error.message); // Log the error for debugging
            res.status(500).json({ success: false, error: error.response?.data || error.message });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
}
