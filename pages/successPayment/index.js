import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { addToWishlist, removeAllFromCartlist } from '../../utilities/redux/slices/courseSlice';
import axios from 'axios';

export default function SuccessPayment() {
    const router = useRouter();
    const dispacth = useDispatch()



    useEffect(() => {
        

        Swal.fire({
            title: "Your Payment Succeded",
            icon: "success",
            confirmButtonText: "Back To Home",
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/');
                dispacth(removeAllFromCartlist())
            }
        });
    }, []);



    return (
        <div className='w-screen h-screen'>

        </div>
    );
}
