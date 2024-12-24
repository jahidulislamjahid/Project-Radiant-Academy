import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaBookmark, FaClock, FaHeart, FaPenNib } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { FcMoneyTransfer } from "react-icons/fc";
import { fetchQuizzes } from '../../utilities/redux/slices/quizSlice';
import ProfileDetailsSection from './ProfileDetailsSection';
import useLoading from '../../utilities/Hooks/useLoading'

const ProfileSection = ({ account }) => {
    const { loading, LoadingIndicator } = useLoading()


    const thisUser = useSelector((state) => state?.loginUser?.loginUser)
    console.log(thisUser);



    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();


    const userCreatDate = new Date(thisUser?.createdAt)

    const allCourses = useSelector((state) => state.courses.coursesList);
    const purchaseCourses = thisUser?.enrolledCourses;
    console.log(allCourses);
    console.log('purchase course', purchaseCourses);


    const totalSpend = allCourses?.filter((course) =>
        purchaseCourses?.some((item) => item?.courseId === course?._id))?.reduce(
            (total, course) => total + course?.price, 0);
    console.log('totalspend', totalSpend);


    useEffect(() => {
        dispatch(fetchQuizzes());
    }, [dispatch]);


    //rating system
    const ratingCount = {
        size: 0,
        count: 5,
        color: "black",
        activeColor: "red",
        value: thisUser?.enrolledCourses.length,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        onChange: newValue => {
            setRating(newValue);
        }
    };

    // !signInUserData && router.replace('/login');

    const formateDate = (date) => {
        const dateOption = {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',

        }
        return new Intl.DateTimeFormat('es-US', dateOption).format(date).replace(',', '')
    }

    const userFormatedDate = formateDate(userCreatDate)
    if (loading) {
        return LoadingIndicator
    }

    return (
        <div>
            {thisUser &&
                <div className="grid xs:grid-cols-1 md:grid-cols-4 p-8 bg-white dark:bg-slate-800 gap-5">
                    <div className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 p-5 rounded-lg py-6 flex justify-center">
                        <div className="flex-col text-center">
                            <div>
                                <Image
                                    src={thisUser?.photoURL}
                                    alt="Profile Picture"
                                    width={100}
                                    height={100}
                                    className="rounded-full"
                                />
                            </div>
                            <div className="py-2">
                                <h2 className="text-xl font-bold">{thisUser?.name}</h2>
                                <p className="text-stone-500 dark:text-stone-400">{thisUser?.email}</p>
                            </div>
                            <div>
                                <p className="mt-3 flex items-center mb-1">
                                    <FaClock className="mr-2" />{userFormatedDate}
                                </p>
                                <p className="flex items-center mb-1">
                                    <FaPenNib className="mr-2" />Enrolled Courses : {thisUser?.enrolledCourses.length}</p>
                                <p className="flex items-center mb-1">
                                    <FcMoneyTransfer className="mr-2 " />Total Spent : {totalSpend} BDT
                                </p>
                                <p className="flex items-center mb-1 uppercase">
                                    <FaBookmark className="mr-2 text-orange-500 dark:text-orange-400 " />Rank : {thisUser?.role}
                                </p>
                            </div>
                            <div className="py-3 text-center">
                                <h5 className="text-lg">Overall Rating</h5>
                                <div className="ratings flex">
                                    <ReactStars {...ratingCount} value={thisUser.enrolledCourses.length} edit={false} /> ({thisUser?.enrolledCourses.length})
                                    <style >
                                        {`
                                        .ratings {
                                            margin: 1rem;
                                        }
                                        .ratings span i{
                                            color: orange;
                                            font-size: 1.25rem;
                                        }
                                    `}
                                    </style>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 bg-slate-200 dark:bg-slate-700 p-5 rounded-lg">
                        <ProfileDetailsSection account={account} />
                    </div>
                </div>
            }

        </div>
    );
};

export default ProfileSection;