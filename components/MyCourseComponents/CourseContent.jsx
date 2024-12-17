import Link from "next/link";
import { FaBookmark, FaStar, FaStarHalf, FaArrowRight } from 'react-icons/fa';
import { BiRightArrow } from 'react-icons/bi';

const CourseContent = ({ course }) => {
    return (
        <div className='bg-white dark:bg-[#2f3c4f]'>
            <div className="py-12 px-10 lg:px-32 text-slate bg-white-900 dark:bg-slate-800 dark:text-white">
                <div className="text-white bg-slate-800 dark:bg-slate-600 p-10 rounded">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h1 className="my-1 text-[2.1em] font-medium">
                                {course?.data.title}
                            </h1>
                            <p className="flex items-center">
                                <FaBookmark className="text-orange-500" /> &nbsp; {course?.data.subtitle}
                            </p>
                            {/* <div className="flex items-center text-rose-500 my-3">
                                <span className="flex items-center text-2xl"><FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf /></span>
                                <span className="text-white text-[1em]">(45)</span>
                            </div>
                            <p className="text-sm mt-2">● 10 Quizzes ● 10 Articles ● 10 Problem Solving</p> */}
                        </div>
                        <div className="flex flex-col py-10 md:py-0">
                            <Link href={`/quiz/${course?.data._id}`} passHref>
                                <button className="bg-rose-500 animate-[pulse_1s_ease-in-out_infinite] rounded-md text-white px-7 py-3 flex justify-center items-center mx-auto">
                                    START QUIZ NOW &nbsp; <FaArrowRight style={{ fontSize: '14px', marginTop: '2px' }} />
                                </button>
                            </Link>
                            {/* <p className="text-sm text-stone-300 mt-4 mx-4">* <span className='text-orange-500'>25</span> Already Enrolled!</p> */}
                        </div>
                    </div>
                </div>
                <div className="border-[1px] border-slate-400 dark:border-slate-600 my-6 shadow-md"></div>
                <div className="mx-auto w-5/6 text-slate-800 dark:text-slate-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-3 py-4 bg-slate-100 dark:bg-slate-600">
                        <a href="#articles" className="text-center text-xl font-medium text-purple-900 dark:text-violet-300">Articles</a>
                        <a href="#quizzes" className="text-center text-xl font-medium text-stone-500 dark:text-violet-300">Quizzes</a>
                        
                        <Link href={`/courses/${course?.data?._id}`}>
                        <h1 className="text-center text-xl font-medium text-stone-500 dark:text-violet-300">Course Content</h1>
                        </Link>
                        
                    </div>
                </div>
                <div className="py-16">
                    <section id="articles">
                        <article>
                            {course?.data?.description}
                        </article>
                        
                        <div className="pt-5">
                            <a className="text-xl hover:text-rose-500 flex items-center" href="https://codepen.io/chriscoyier/pen/vWEMWw" target="_blank" rel="noopener noreferrer">Live Example <BiRightArrow style={{ fontSize: 20, marginLeft: 5 }} /></a>
                        </div>
                    </section>
                    {/* <section id="problem-solving">
                        <div className="py-20 text-center">
                            <h1 className="text-4xl font-medium">Problem Solving</h1>
                            <h2 className="text-2xl text-green-500 mt-4">Coming Soon!</h2>
                        </div>
                    </section> */}
                    <section id="quizzes">
                        <Link href={`/quiz/${course?.data._id}`} passHref>
                            <button className="bg-rose-500 animate-[pulse_1s_ease-in-out_infinite] rounded-md text-white px-7 py-3 my-10 flex justify-center items-center mx-auto">
                                START QUIZ NOW &nbsp; <FaArrowRight style={{ fontSize: '14px', marginTop: '2px' }} />
                            </button>
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CourseContent;