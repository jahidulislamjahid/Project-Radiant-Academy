import React, { Suspense, useState } from 'react';
import { FaBookmark, FaStar, FaStarHalf, FaLink } from 'react-icons/fa';
import { BsCheck2All, BsCheck2Circle } from 'react-icons/bs';
import ReactStars from "react-rating-stars-component";
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Triangle } from 'react-loader-spinner';

const CourseDetailsSection = ({ course }) => {
    const [rating, setRating] = useState(4.5);
    const reviews = course?.data?.reviews
    const thisUser = useSelector((state) => state.loginUser.loginUser);
    const userEnrolled = thisUser?.enrolledCourses || [];
    const cousrseOutline = course?.data?.outLineText
    



    // Check if the user has purchased the course 
    const isPurchase = userEnrolled?.some((item) => item.courseId == course.data._id);




    //rating system
    const ratingCount = {
        size: 0,
        count: 5,
        color: "black",
        activeColor: "red",
        value: 0,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        onChange: newValue => {
            setRating(newValue);
        }
    };

    return (

        <div className='bg-white dark:bg-[#2f3c4f]'>
            <div className="py-12 px-10 lg:px-32 text-white bg-slate-800 dark:bg-slate-800">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h1 className="my-1 text-[2.1em] font-medium">
                            {course?.data?.title}
                        </h1>
                        <p className="flex items-center">
                            <FaBookmark className="text-orange-500" /> &nbsp; {course?.data?.subtitle}
                        </p>


                    </div>
                    <div className="flex flex-col py-10 md:py-0">
                        <div className='text-3xl font-bold py-3 text-center'>
                            {isPurchase ? '' :
                                <h2> <span>৳</span> {course?.data?.price}</h2>
                            }
                        </div>
                        {
                            isPurchase ? <h1 className='text-rose-500'>You are already in this course</h1> :
                                <Link href={`/courses/payment/${course?.data?._id}`} passHref><button className="bg-rose-500 px-5 py-3 text-white uppercase rounded-md font-medium">Enroll Now</button></Link>
                        }
                        <p className="text-sm text-stone-300 mt-4 mx-4">* <span className='text-orange-500'>{course?.data?.enrolled}</span> Already Enrolled!</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto w-5/6 text-slate-800 dark:text-slate-200">
                <div className="grid grid-cols-1  md:grid-cols-2  px-3 py-8 bg-slate-100 dark:bg-slate-600">
                    <a href="#about-the-course" className="text-center text-xl font-medium text-purple-900 dark:text-violet-300">About This Course</a>
                    <a href="#syllabus" className="text-center text-xl font-medium text-stone-500 dark:text-violet-400">Course Outline</a>
                    {/* <a href="#reviews" className="text-center text-xl font-medium text-stone-500 dark:text-violet-400">Reviews</a>
                    <a href="#related-course" className="text-center text-xl font-medium text-stone-500 dark:text-violet-400">Related Course</a> */}
                </div>

                <div className="mt-8 py-8">
                    <section id="#about-the-course">
                        <div className='flex justify-center pb-14'>
                            {
                                isPurchase ?
                                    <iframe
                                        width="1200"
                                        height="600"
                                        src={course?.data?.courseVideo}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        draggable="false"
                                    ></iframe> : <h1 className='font-bold text-rose-500 animate-[pulse_1s_ease-in-out_infinite] mb-5 text-center'>**** Plese Enroll to watch video ***</h1>

                            }
                        </div>
                        <div className="flex items-center">
                            <div>
                                <a href="#about-the-course">
                                    <FaLink className="hover:text-purple-900 mr-3 text-xl" />
                                </a>
                            </div>
                            <div>
                                <h3 className="text-2xl font-medium text-rose-500">About this Course</h3>
                                <p className="text-sm text-stone-400 mt-1">Recently Viewed By: 1025</p>
                            </div>
                        </div>
                        <hr className="my-3" />
                        <div>
                            <p>{course?.data?.description}</p>
                        </div>
                    </section>
                </div>
                <div className="mt-1 py-8">
                    <section id="syllabus">
                        <div className="flex items-center">
                            <div>
                                <a href="#syllabus"><FaLink className="hover:text-purple-900 mr-3 text-xl" /></a>
                            </div>
                            <div>
                                <h3 className="text-2xl font-medium text-rose-500">Course Outline</h3>
                            </div>
                        </div>
                        <div className=" mt-6">
                            <div className="py-8 px-16 bg-violet-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-xl">
                                {
                                    cousrseOutline?.map((text, idx) => (
                                        <ul key={idx}  >
                                            <li className='mb-5'>
                                                <h1>
                                                    <span>{idx + 1}.</span> {text}
                                                </h1>
                                            </li>
                                        </ul>
                                    ))
                                }

                            </div>
                          
                        </div>
                    </section>
                </div>
               
               
            </div>
        </div>

    );
};

export default CourseDetailsSection;
