import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { addToWishlist, removeAllFromCartlist } from '../../utilities/redux/slices/courseSlice';
import axios from 'axios';

export default function SuccessPayment() {
    const router = useRouter();
    const dispacth = useDispatch()

    const sslRes = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/successPayment`)
            console.log(res);
        }
        catch (err) {
            console.log('cant fetch', err);
        }
    }

    useEffect(() => {
        

        Swal.fire({
            title: "Your Payment Succeded",
            icon: "success",
            confirmButtonText: "Back To Home",
        }).then((result) => {
            if (result.isConfirmed) {
                sslRes()
                // router.push('/');
                dispacth(removeAllFromCartlist())
            }
        });
    }, []);



    return (
        <div className='w-screen h-screen'>

        </div>
    );
}
