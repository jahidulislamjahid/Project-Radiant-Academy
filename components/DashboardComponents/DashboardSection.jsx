import { ArcElement, Chart } from 'chart.js';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { BsArrowRight, BsCheck2Circle } from 'react-icons/bs';
import { FaBookmark, FaClock, FaClone, FaCopy, FaEdit, FaEnvelope, FaEye, FaHashtag, FaHeart, FaIdCardAlt, FaInfoCircle, FaNewspaper, FaPhoneSquareAlt, FaPlus } from 'react-icons/fa';
import { MdPending } from 'react-icons/md';
import { CgArrowRightO } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import DashboardSidebar from './DashboardSidebar';
import useAuth from '../../utilities/Hooks/useAuth';
import useCrud from '../../utilities/Hooks/useCrud';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";


Chart.register(ArcElement);

const DashboardSection = () => {

    const [monthlyEarnings, setMonthlyEarnings] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);


    const router = useRouter();
    const { user } = useAuth();
    const { handleApprove } = useCrud();

    // load all payment data
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await axios.get('/api/AdminProfit');
                const payments = res?.data;

                // Process data to calculate monthly earnings
                const earningsByMonth = payments?.reduce((acc, payment) => {
                    const month = new Date(payment.tran_date).toLocaleString('default', { month: 'long' });
                    const year = new Date(payment.tran_date).getFullYear();
                    const key = `${month} ${year}`;

                    const storeAmount = parseFloat(payment.store_amount) || 0;

                    if (!acc[key]) {
                        acc[key] = storeAmount;
                    } else {
                        acc[key] += storeAmount;
                    }

                    return acc;
                }, {});

                // Convert object to an array for Recharts
                const formattedData = Object.keys(earningsByMonth).map(month => ({
                    month,
                    earnings: earningsByMonth[month],
                }));

                setMonthlyEarnings(formattedData);
            } catch (error) {
                console.error("Error fetching payments:", error);
            }
        };

        fetchPayments();
    }, []);

    useEffect(() => {
        // Detect dark mode
        const rootElement = document.documentElement;
        setIsDarkMode(rootElement.classList.contains('dark'));

        const observer = new MutationObserver(() => {
            setIsDarkMode(rootElement.classList.contains('dark'));
        });

        observer.observe(rootElement, { attributes: true });

        return () => observer.disconnect();
    }, []);









    const allCourses = useSelector((state) => state.courses.coursesList);
    const allTopics = useSelector((state) => state.forums.forumsList);
    const allReviews = useSelector((state) => state.reviews.reviewsList);
    const allQuizzes = useSelector((state) => state.quizzes.quizzesList);
    const allUsers = useSelector((state) => state.users.usersList);

    const thisUser = useSelector((state) => state.loginUser.loginUser)

    const pendingList = allTopics.filter(forum => {
        if (forum.status === false) {
            return forum
        }
    })



    // const config = {
    //     type: 'doughnut',
    //     data: data,
    // };

    // const data = {
    //     labels: [
    //         'Enrolled',
    //         'Available'
    //     ],
    //     datasets: [{
    //         label: 'Enrollment Chart',
    //         data: [250, 50],
    //         backgroundColor: [
    //             'rgb(50, 0, 126)',
    //             'rgb(255, 202, 48)'
    //         ],
    //         hoverOffset: 2
    //     }]
    // };

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 3000,
        speed: 700,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    dots: true,
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                },
            },
        ],
    };

    if (thisUser?.role !== 'admin' || thisUser?.role === undefined) {
        router.push('./')
    }

    return (
        <>
            {(thisUser?.role === 'admin') &&
                <div className="px-0 sm:px-6 lg:px-12">
                    <div className="grid grid-rows-1 md:grid-cols-[250px_minmax(300px,_1fr)] lg:grid-cols-[250px_minmax(600px,_1fr)] p-8 gap-5">
                        <div>
                            <DashboardSidebar />
                        </div>

                        <div className="bg-slate-100 dark:bg-slate-700 shadow-md rounded-md py-8 px-5 h-auto">
                            <div className="rounded-md p-5 text-slate-700 font-semibold bg-slate-200 dark:bg-slate-600 dark:text-slate-200 shadow-md" >
                                <h5 className="text-lg">Site Overview</h5>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 pb-1 px-4">
                                    <div className="flex flex-col items-start pl-4 border-l-2 mb-2 border-l-slate-700 dark:border-l-slate-400">
                                        <h3 className="text-2xl">{pendingList.length}</h3>
                                        <p>Pending Submissions</p>
                                    </div>
                                    <div className="flex flex-col items-start pl-4 border-l-2 mb-2 border-l-slate-700 dark:border-l-slate-400">
                                        <h3 className="text-2xl">{allTopics.length}</h3>
                                        <p>Submissions</p>
                                    </div>
                                    <div className="flex flex-col items-start pl-4 border-l-2 mb-2 border-l-slate-700 dark:border-l-slate-400">
                                        <h3 className="text-2xl">{allUsers.length}</h3>
                                        <p>Total Accounts</p>
                                    </div>
                                    <div className="flex flex-col items-start pl-4 border-l-2 mb-2 border-l-slate-700 dark:border-l-slate-400">
                                        <h3 className="text-2xl">2</h3>
                                        <p>Subscribers</p>
                                    </div>
                                    <div className="flex flex-col items-start pl-4 border-l-2 mb-2 border-l-slate-700 dark:border-l-slate-400">
                                        <h3 className="text-2xl">{allCourses.length}</h3>
                                        <p>Total Courses</p>
                                    </div>
                                    <div className="flex flex-col items-start pl-4 border-l-2 mb-2 border-l-slate-700 dark:border-l-slate-400">
                                        <h3 className="text-2xl">{allQuizzes.length}</h3>
                                        <p>Total Quizzes</p>
                                    </div>
                                    <div className="flex flex-col items-start pl-4 border-l-2 mb-2 border-l-slate-700 dark:border-l-slate-400">
                                        <h3 className="text-2xl">{allTopics.length}</h3>
                                        <p>Forum Posts</p>
                                    </div>
                                    <div className="flex flex-col items-start pl-4 border-l-2 mb-2 border-l-slate-700 dark:border-l-slate-400">
                                        <h3 className="text-2xl">{allReviews.length}</h3>
                                        <p>Total Reviews</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-rows-1 md:grid-cols-[300px_minmax(200px,_1fr)] lg:grid-cols-[350px_minmax(400px,_1fr)] gap-5 mt-5">
                                <div>
                                    <div className="bg-slate-200 shadow-md rounded-md p-5 h-auto mb-5 course-card dark:bg-slate-600">
                                        <div className="flex items-center justify-between text-slate-700 dark:text-white">
                                            <div className="flex items-center">
                                                <FaClone className="mr-2 text-lg" />
                                                <h5 className="text-lg font-semibold">{allCourses.length} Courses</h5>
                                            </div>
                                            <Link href="/dashboard/courses/add-new-course" passHref>
                                                <button className="px-4 py-1.5 hover:bg-stone-100 hover:text-slate-800 rounded-lg flex items-center uppercase">
                                                    <FaPlus className="mr-2 text-sm" /> New Course
                                                </button>
                                            </Link>
                                        </div>
                                        <Slider {...settings}>
                                            {
                                                allCourses.map(course => {
                                                    // Set dynamic values for enrolled and available based on course data
                                                    const config = {
                                                        type: 'doughnut',
                                                        data: data,
                                                    };
                                                    const data = {
                                                        labels: ['Enrolled', 'Available'],
                                                        datasets: [{
                                                            label: 'Enrollment Chart',
                                                            data: [course.enrolled, 100 - course.enrolled], // Example: Total capacity is 1000
                                                            backgroundColor: [
                                                                'rgb(50, 0, 126)',
                                                                'rgb(255, 202, 48)'
                                                            ],
                                                            hoverOffset: 2
                                                        }]
                                                    };

                                                    return (
                                                        <div className="course-items" key={course._id}> {/* Ensure unique key */}
                                                            <div className="my-5 flex justify-center items-center text-white py-1.5 px-2 bg-violet-700 dark:bg-gray-400 rounded-md">
                                                                <h5>{course.title}</h5>
                                                            </div>
                                                            <div className="my-4 flex justify-between items-center py-1.5 px-2 border-b-2 border-purple-800 dark:border-white">
                                                                <p className="text-red-600 dark:text-white text-sm font-medium">Enrollment: {course.enrolled}</p>
                                                                <p className="text-red-600 dark:text-white text-sm font-medium">Price: ৳ {course.price}</p>
                                                            </div>
                                                            <div className="mt-2 py-3 grid grid-rows-1">
                                                                <div className="flex flex-col sm:flex-row justify-center items-center">
                                                                    <div className="w-1/4 sm:mr-3">
                                                                        <Doughnut data={data} options={config} />
                                                                    </div>
                                                                    <div>
                                                                        <div className="flex items-center">
                                                                            <div className=" mr-2 rounded-md" style={{ backgroundColor: '#32007E', width: '15px', height: '15px' }}></div>
                                                                            <p className="text-sm text-black dark:text-white">Enrolled - <span className="text-black dark:text-white">{course.enrolled}</span></p>
                                                                        </div>
                                                                        <div className="flex items-center">
                                                                            <div className="mr-2 rounded-md" style={{
                                                                                backgroundColor: '#FFCA30', width: '15px', height: '15px'
                                                                            }}></div>
                                                                            <p className="text-sm text-black dark:text-white">Available - <span className="text-black dark:text-white">{100 - course.enrolled} </span></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </Slider>

                                        <style >
                                            {`
                                            .course-card .slick-list{
                                                padding-top: 0;
                                                padding-bottom: 2rem;
                                            }
                                            .course-card .slick-prev, .course-card .slick-next {
                                                top: 2.5rem;
                                            }
                                            .slick-prev:before {
                                                color: #32007E;
                                            }
                                            
                                            .slick-next:before {
                                                color: #32007E;
                                            }
                                            
                                            .slick-slide:focus {
                                                outline: none;
                                            }
                                            
                                            .slick-dots {
                                                bottom: 0px;
                                            }
                                            
                                            .slick-dots li button:before {
                                                font-size: 0.75rem;
                                                opacity: 1;
                                                color: #CCDEE2;
                                            }
                                            
                                            .slick-dots li.slick-active button:before {
                                                opacity: .75;
                                                color: #F2522F;
                                            }
                                        `}
                                        </style>
                                    </div>
                                    <div className="bg-slate-200 dark:bg-slate-600 shadow-md rounded-md p-5 h-auto mb-5">
                                        <div className="flex items-center justify-between text-slate-700 dark:text-white">
                                            <div className="flex items-center">
                                                <FaInfoCircle className="mr-2 text-lg" />
                                                <h5 className="text-lg font-semibold">Account Info</h5>
                                            </div>
                                            {/* <button className="px-4 py-1.5 hover:bg-stone-100 rounded-lg flex items-center uppercase hover:text-slate-800"><FaEdit className="mr-2" /> Edit</button> */}
                                        </div>
                                        <div className="border-[1px] border-slate-700 dark:border-white my-2"></div>
                                        <table className="table-compact text-slate-700 dark:text-white">
                                            <tbody>
                                                <tr>
                                                    <td className="flex items-center">
                                                        <FaIdCardAlt className="mr-2" />Name
                                                    </td>
                                                    <td>:&nbsp; {thisUser.displayName}</td>
                                                </tr>
                                                <tr>
                                                    <td className="flex items-center">
                                                        <FaBookmark className="mr-2" />Role
                                                    </td>
                                                    <td className="uppercase">:&nbsp; {thisUser.role}</td>
                                                </tr>
                                                {/* <tr>
                                                    <td className="flex items-center">
                                                        <FaPhoneSquareAlt className="mr-2" />Phone
                                                    </td>
                                                    <td>: +880 1765456</td>
                                                </tr> */}
                                                <tr>
                                                    <td className="flex items-center">
                                                        <FaEnvelope className="mr-2" />Email
                                                    </td>
                                                    <td>{user.email}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {/* <div className="flex justify-end mt-3">
                                            <button className="text-sm flex items-center px-4 py-1 font-semibold rounded-full hover:bg-stone-100 text-violet-900 dark:text-violet-300 dark:hover:bg-slate-700">See More Info <BsArrowRight className="ml-2 text-[15px] text-red-600 dark:text-red-400" /></button>
                                        </div> */}
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-slate-200 shadow-md rounded-md p-5 h-auto mb-5 dark:bg-slate-600">
                                        <div className="flex items-center text-xl font-semibold pt-1 pb-4 border-b-2 text-slate-700 dark:text-white border-slate-700 dark:border-white">
                                            <MdPending className="mr-2" />
                                            <h3>Pending Submissions: {pendingList.length}</h3>
                                        </div>
                                        <Slider {...settings}>
                                            {
                                                pendingList.map(forum => (
                                                    <div className="p-5 border-2 rounded-xl border-slate-500 shadow-md" key={forum._id}>
                                                        <h4 className="text-lg font-semibold mb-1 dark:text-white">
                                                            {forum.title}
                                                        </h4>
                                                        <p className="text-[0.9em] text-gray-600 dark:text-white mb-1">
                                                            {forum.desc.split(' ').slice(0, 40).toString().replace(/,/g, ' ')}...
                                                        </p>
                                                        <div className="flex items-center justify-between mt-3">
                                                            <span className="flex items-center">
                                                                <FaClock className="mr-2 text-sm dark:text-white" />
                                                                <p className="text-[0.9em] dark:text-white">January 12</p>
                                                            </span>
                                                            <span className="flex items-center">
                                                                <FaHashtag className="mr-2 text-sm dark:text-white" />
                                                                <p className="text-[0.9em] dark:text-white">{forum.category}</p>
                                                            </span>
                                                            <span className="flex items-center">
                                                                <FaEye className="mr-2 text-sm dark:text-white" />
                                                                <p className="text-[0.9em] dark:text-slate-200">{forum.views}</p>
                                                            </span>
                                                            <span className="flex items-center">
                                                                <FaHeart className="mr-2 text-sm dark:text-white" />
                                                                <p className="text-[0.9em] dark:text-slate-200">{forum.reacts}</p>
                                                            </span>
                                                            <span className="flex items-center">
                                                                <button onClick={() => handleApprove(forum._id, 'topic')}>
                                                                    <BsCheck2Circle className="mr-2 text-lg dark:text-white font-semibold" />
                                                                </button>
                                                            </span>
                                                            <Link href={`/forum/${forum._id}`} passHref>
                                                                <button>
                                                                    <CgArrowRightO className="dark:text-white text-lg" />
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </Slider>
                                        <style >
                                            {`
                                            .slick-list{
                                                padding: 2rem 0;
                                            }
                                        `}
                                        </style>

                                        {/* <div className="flex justify-center mt-3">
                                            <button className="text-sm flex items-center px-4 py-1 font-semibold rounded-full hover:bg-stone-100 text-violet-900 dark:text-violet-300 dark:hover:bg-slate-700">See More Submissions <BsArrowRight className="ml-2 text-[15px] text-red-600" /></button>
                                        </div> */}
                                    </div>
                                    <div className="bg-slate-200 dark:bg-slate-600 shadow-md rounded-md p-5 h-auto mb-5 ">
                                        <div className="flex items-center text-xl font-semibold pt-1 pb-4 border-b-2 border-stone-300 text-slate-700 dark:text-white dark:border-white">
                                            <FaNewspaper className="mr-2" />
                                            <h3>Earning </h3>
                                        </div>
                                        <ResponsiveContainer width="100%" height={400}>
                                            <BarChart data={monthlyEarnings}>
                                                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#444" : "#ccc"} />
                                                <XAxis
                                                    dataKey="month"
                                                    tick={{ fill: isDarkMode ? "#fff" : "#000" }}
                                                />
                                                <YAxis
                                                    tick={{ fill: isDarkMode ? "#fff" : "#000" }}
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: isDarkMode ? "#333" : "#fff",
                                                        color: isDarkMode ? "#fff" : "#000",
                                                    }}
                                                />
                                                <Bar dataKey="earnings" fill="#8884d8" />
                                            </BarChart>
                                        </ResponsiveContainer>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    );
};

export default DashboardSection;
