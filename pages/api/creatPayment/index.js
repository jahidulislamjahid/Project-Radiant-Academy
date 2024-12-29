import axios from 'axios';
import dbConnect from '../../../utilities/mongoose';
import Payment from '../../../models/PaymentModel';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    if (method === "POST") {
        const {ammont, currency , cus_email , cus_name , purchaseCourse} = req.body;
        const date = Date.now()
        
        const incompletePaymentInfo ={
            tran_id: ammont + date, 
            status :'incomplete',
            cus_email :cus_email,
            cus_name : cus_name, 
            purchaseCourse : purchaseCourse
        }

        const initiatePaymentData = {
            store_id: "radia67646af6ac894",
            store_passwd: "radia67646af6ac894@ssl",
            total_amount: ammont || "0", // Default value if ammont is undefined
            currency: currency,
            tran_id: ammont + date, // Replace with a unique transaction ID
            success_url: `${process.env.NEXT_PUBLIC_API}/api/successPayment`, // Replace with the actual URL
            fail_url: `${process.env.NEXT_PUBLIC_API}`, // Replace with the actual URL
            cancel_url: `${process.env.NEXT_PUBLIC_API}`, // Replace with the actual URL
            cus_name: cus_name ,
            cus_email: cus_email ,
            cus_add1: "Customer Address 1",
            cus_add2:  "",
            cus_city: "City",
            cus_state: "State",
            cus_postcode:  "1000",
            cus_country:  "Bangladesh",
            cus_phone: "01711111111",
            cus_fax: "",
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

        const saveData = await Payment.create(incompletePaymentInfo);
        

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
            console.error("ssl fail reason", error.response?.data || error.message); // Log the error for debugging
            res.status(500).json({ success: false, error: error.response?.data || error.message });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
}