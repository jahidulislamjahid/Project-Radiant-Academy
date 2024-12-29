import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaDollarSign, FaEye, FaFlag, FaHashtag, FaHeart, FaTrash, FaUserFriends } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useCrud from '../../utilities/Hooks/useCrud';
import { setWhichCourse } from '../../utilities/redux/slices/quizSlice';
import axios from 'axios';
import UserPaymentRow from './UserPaymentRow';

const ProfileDetailsSection = ({ account }) => {
    const thisUser = useSelector((state) => state?.loginUser?.loginUser)
    const [paymentHistory, setPaymentHistory] = useState([]);


    const router = useRouter();
    const dispatch = useDispatch();
    const { handleRemove } = useCrud();

    const allCourses = useSelector((state) => state.courses.coursesList);

    const allTopics = useSelector((state) => state.forums.forumsList);
    // console.log(allTopics);

    // load user all payment history
    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const res = await axios.get(`/api/userPayment/${thisUser?.email}`);
                setPaymentHistory(res.data.data); // Store data in state
                console.log('Payment history:', res.data.data);
            } catch (error) {
                console.error('Error fetching payment history:', error.message);
            }
        };

        if (thisUser?.email) {
            fetchPaymentHistory();
        }
    }, []);




    const enrolled = account?.data[0]?.enrolledCourses;
    const enrolledChecker = account.data.length !== 0 ? enrolled.map(enroll => {
        let index = allCourses?.findIndex(course => enroll.courseId === course._id);
        if (index > -1) {
            return allCourses[index];
        }
        return 0;
    }) : '';

    const handleDelete = () => {
        console.log('clicked')
    }

    const handleQuiz = (course) => {
        dispatch(setWhichCourse(course._id));
        router.push(`/my-course/course-contents/${course._id}`);
    }

    return (
        <div className='bg-slate-200 dark:bg-slate-700'>
            <div className="p-5 bg-slate-200 dark:bg-slate-700">
                <Tabs>
                    <TabList className="grid grid-cols-4 mb-5 text-center gap-2 border-b-2 border-black text-slate-700 dark:text-slate-200">
                        <Tab className="bg-transparent border-0 shadow-none text-lg px-2 py-1.5 mx-1 font-medium cursor-pointer">Courses</Tab>
                        <Tab className="bg-transparent border-0 shadow-none text-lg px-2 py-1.5 mx-1 font-medium cursor-pointer">Payment History</Tab>
                        {/* <Tab className="bg-transparent border-0 shadow-none text-lg px-2 py-1.5 mx-1 font-medium cursor-pointer">Progress</Tab>
                        <Tab className="bg-transparent border-0 shadow-none text-lg px-2 py-1.5 mx-1 font-medium cursor-pointer">Settings</Tab> */}
                    </TabList>

                    <div className="tab-panes bg-slate-200 dark:bg-slate-700">
                        <TabPanel className="p-5">
                            <section className="overflow-x-auto">
                                <div className=" w-full overflow-none">
                                    <div>
                                        {
                                            account.data.length !== 0 ?
                                                enrolledChecker.map(course => (
                                                    <div className="container grid md:grid-cols-5 xs:grid-cols-1 bg-slate-700 text-slate-200 dark:text-slate-800 dark:bg-slate-200 pl-3 rounded-md mb-2 items-center" key={course._id}>
                                                        <h1 className="font-semibold md:col-span-2 my-2">{course.title}</h1>
                                                        <h1>
                                                            <span className="flex items-center my-2">
                                                                <h3 className='text-lg'><span className='font-semibold'>৳</span> {course.price}</h3>
                                                                {/* <FaDollarSign className="text-lg" />{course.price} */}
                                                            </span>
                                                        </h1>
                                                        <h1 className=" text-green-600 font-semibold uppercase my-2">Premium</h1>
                                                        {/* <h1>
                                                            <span className="flex items-center my-2">
                                                                <FaUserFriends className="text-2xl mr-1.5 text-purple-800" /> {course.enrolled}
                                                            </span>
                                                        </h1> */}
                                                        {/* <h1>
                                                            <span className="flex items-center my-2">
                                                                <FaHeart className="mr-1.5 text-red-500" /> 304
                                                            </span>
                                                        </h1> */}
                                                        {/* <h1 className=" text-orange-500 font-semibold my-2">Pending</h1> */}
                                                        <h1>
                                                            <button className="btn btn-ghost py-0  uppercase my-2" onClick={() => handleQuiz(course)}>
                                                                START
                                                            </button>
                                                        </h1>
                                                    </div>
                                                )) : <h2 className='text-4xl text-center bg-white dark:text-white dark:bg-slate-700 overflow-hidden'>You have not enrolled any courses</h2>
                                        }
                                    </div>
                                </div>
                            </section>
                        </TabPanel>
                        <TabPanel className="px-5 pt-0">
                            <section className="overflow-x-auto">
                                {
                                    !paymentHistory && <h1 className='text-rose-500'>No Payment History yet</h1>
                                }
                                {
                                    paymentHistory &&

                                    <div className="overflow-x-auto ">
                                        <table className="table w-full dark:text-white uppercase">
                                            {/* head */}
                                            <thead className=''>
                                                <tr className='border-b border-white'>

                                                    
                                                    <th className='dark:bg-slate-600 bg-slate-200'>Transaction Id</th>
                                                    <th className='dark:bg-slate-600 bg-slate-200'>Status</th>
                                                    <th className='dark:bg-slate-600 bg-slate-200'>Ammount</th>
                                                    <th className='dark:bg-slate-600 bg-slate-200'>Items</th>
                                                    <th className='dark:bg-slate-600 bg-slate-200'>Transaction Type</th>
                                                    <th className='dark:bg-slate-600 bg-slate-200'>Date</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    paymentHistory.map(payment =>
                                                        <UserPaymentRow
                                                            key={payment?._id}
                                                            payment={payment}
                                                        />
                                                    )
                                                }
                                            </tbody>
                                       
                                        </table>
                                    </div>

                                }
                            </section>
                        </TabPanel>

                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default ProfileDetailsSection;
