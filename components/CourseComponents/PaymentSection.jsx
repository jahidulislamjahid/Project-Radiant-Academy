/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FaInfoCircle, FaEnvelope,  FaBookmark, FaIdCardAlt, FaCcVisa } from 'react-icons/fa';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2'
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";


const PaymentSection = ({ course }) => {
    const router = useRouter();

    const item = course?.data
    console.log(item.price);


    const thisUser = useSelector((state) => state.loginUser.loginUser)
    

    const [userEmail, setUserEmail] = useState(thisUser?.email ? thisUser?.email : '')
    const [userName, setUserName] = useState(thisUser?.displayName ? thisUser?.displayName : '')

    const handleEmail = (e) => {
        setUserEmail(e.target.value)
    }
    const handleName = (e) => {
        setUserName(e.target.value)
    }

    const handleSSLPayment = async (e) => {
        e.preventDefault()        
        try {
            const res = await axios.post(`../../api/creatPayment`, {
                ammont: item?.price,
                currency: 'BDT',
                cus_email:userName,
                cus_name:userName,
                purchaseCourse : [item?._id]
            })
            const redirectURL = res?.data?.data.GatewayPageURL
            console.log('url', redirectURL);
            


            if (redirectURL) {
                window.location.replace(redirectURL)
            } 

        }
        catch (err) {
            console.log('error', err);

        }

    }


    const payAndEnroll = async (user) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API}/api/users/enroll/${thisUser._id}/${course.data._id}`, user.data);
            if (res.status === 201) {
                Swal.fire(
                    'Payment Complete',
                    'Thanks for the payment',
                    'success'
                )
                router.push(`/my-course/${user.email}`);
            }
        } catch (err) {
            console.log(err);
        }
    };


    // PAYPAL VALUES
    const amount = "2";
    const currency = "USD";
    const style = { "layout": "vertical" };


    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);


        return (
            <>
                {(showSpinner && isPending) && <div className="spinner" />}
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function () {
                            // Your code here after capture the order
                        });
                    }}
                />
            </>
        );
    }



    return (
        <div className='bg-white dark:bg-slate-800'>
            <div className="px-24 py-16">
                <div className="grid grid-rows-1 md:grid-cols-[300px_minmax(300px,_1fr)] lg:grid-cols-[350px_minmax(600px,_1fr)] gap-5">
                    <div>

                        <div key={item.id} className="bg-slate-200 dark:bg-slate-700 p-5 grid grid-rows-1 rounded-xl mb-3">
                            <div>
                                <Image
                                    src={item?.image}
                                    alt="Course Cover"
                                    width={300}
                                    height={165}
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold text-2xl text-slate-700 dark:text-slate-200">{item.title}</h4>

                            </div>
                            <div className='bg-slate-100 mt-3 px-5 py-2 rounded-md'>
                                <h4 className="text-2xl text-center sm:text-left font-bold text-rose-500 ">Price <span></span>{item.price} BDT</h4>
                            </div>
                        </div>




                        <div className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-md rounded-md p-5 h-auto mt-5">
                            <div className="flex items-center">
                                <FaInfoCircle className="mr-2 text-lg" />
                                <h5 className="text-lg font-semibold">Account Info</h5>
                            </div>
                            <div className="border-[1px] border-stone-300 my-2"></div>
                            <table className="table-compact">
                                <tbody>
                                    <tr>
                                        <td className="flex items-center">
                                            <FaIdCardAlt /> &nbsp; Name
                                        </td>
                                        <td>:&nbsp;{thisUser?.displayName}</td>
                                    </tr>
                                    <tr>
                                        <td className="flex items-center ">
                                            <FaBookmark /> &nbsp; Role
                                        </td>
                                        <td className='uppercase'>:&nbsp; {thisUser?.role}</td>
                                    </tr>
                                    {/* <tr>
                                        <td className="flex items-center">
                                            <FaPhoneSquareAlt /> &nbsp; Phone
                                        </td>
                                        <td>:&nbsp; +880 123456</td>
                                    </tr> */}
                                    <tr>
                                        <td className="flex items-center">
                                            <FaEnvelope /> &nbsp; Email
                                        </td>
                                        <td>{thisUser?.email}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg">
                        <div>
                            <div className="px-8 py-1 mt-5">
                                <h2 className="text-2xl font-medium">Payment Checkout</h2>
                            </div>
                            <hr className="mt-2 mb-3 mx-6" />
                        </div>
                        <div className="px-10 mb-8">
                            <form>

                                <div className="mt-4">
                                    <label className='pl-1 text-lg  pb-2'>Your Name *</label>
                                    <input
                                        name="name"
                                        onChange={(e) => handleName(e)}
                                        placeholder="Your Name"
                                        defaultValue={userName}
                                        className="bg-slate-100 dark:bg-slate-600 w-full py-2 px-3 outline-none mb-2 text-lg rounded-lg   "
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className='pl-1 text-lg  pb-2'>Your Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        defaultValue={userEmail}
                                        onChange={(e) => handleEmail(e)}
                                        className="bg-slate-100 dark:bg-slate-600 w-full py-2 px-3 outline-none mb-2 text-lg rounded-lg   "
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className='pl-1 text-lg  pb-2'>Contact Number</label>
                                    <input
                                        type="number"
                                        name="number"
                                        placeholder="Your number"
                                        className="bg-slate-100 dark:bg-slate-600 w-full py-2 px-3 outline-none mb-2 text-lg rounded-lg   "
                                    />
                                </div>

                                <h3 className='text-slate-700 dark:text-slate-200 text-2xl py-7'>Pay total <span>{item.price}</span> BDT</h3>

                                <div className='flex flex-col gap-3'>
                                    <button
                                        disabled={!userEmail || !userName}
                                        className='btn hover:bg-[#FFC439] w-full bg-[#FFC439]'>


                                        <PayPalScriptProvider

                                            className=" "
                                            options={{
                                                "client-id": "test",
                                                components: "buttons",
                                                currency: "USD",
                                                "disable-funding": "credit,card,p24,venmo"
                                            }}
                                        >
                                            <ButtonWrapper

                                                currency={currency}
                                                showSpinner={false}
                                            />
                                        </PayPalScriptProvider>
                                    </button>
                                    <button onClick={handleSSLPayment}
                                        disabled={!userEmail || !userName}
                                        className='bg-blue-500 btn btn-block'>
                                        <div className='flex items-center space-x-2'>
                                            <FaCcVisa className='text- text-2xl'></FaCcVisa>

                                            <h1>SSL COMMERCE</h1></div>
                                    </button>
                                </div>
                                <div className='text-center py-5'>
                                    <button className={`text-center mx-auto bg-slate-300 dark:bg-slate-500 py-1 px-4 `} type="submit" onClick={payAndEnroll}>Mark Payment as done (For test)</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSection;