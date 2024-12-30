import Link from 'next/link';
import React from 'react';
import {  FaClone, FaPlus} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import DashboardSidebar from './DashboardSidebar';
import CourseListRow from './CourseListRow';

const CourseSection = () => {

    const allCourses = useSelector((state) => state.courses.coursesList);

    return (
        <div className='px-0 sm:px-6 lg:px-12 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200'>
            <div className='grid grid-rows-1 md:grid-cols-[250px_minmax(300px,_1fr)] lg:grid-cols-[250px_minmax(600px,_1fr)] p-8 gap-5'>
                <section>
                    <DashboardSidebar />
                </section>
                <section className='bg-white dark:bg-slate-700 shadow-md rounded-md py-8 px-5 h-auto'>
                    <div className="flex justify-between items-center px-3 mb-4">
                        <h3 className="text-2xl flex items-center"><FaClone className="mr-3" /> Courses</h3>
                        <Link href="/dashboard/courses/add-new-course" passHref>
                            <button className="flex items-center btn"><FaPlus className="text-sm mr-2" /> Add Courses</button>
                        </Link>
                    </div>

                    <div className="overflow-x-auto ">
                        <table className="table w-full dark:text-white uppercase">
                            {/* head */}
                            <thead className=''>
                                <tr className='border-b border-white'>

                                    <th className='dark:bg-slate-600 bg-slate-200'></th>
                                    <th className='dark:bg-slate-600 bg-slate-200'>Course Title</th>
                                    <th className='dark:bg-slate-600 bg-slate-200'>Price</th>
                                    <th className='dark:bg-slate-600 bg-slate-200'>Rating</th>
                                    <th className='dark:bg-slate-600 bg-slate-200'>Category</th>
                                    <th className='dark:bg-slate-600 bg-slate-200'>Edit</th>
                                    <th className='dark:bg-slate-600 bg-slate-200'>Delete</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allCourses.map(course =>
                                        <CourseListRow
                                            key={course?._id}
                                            course={course}
                                        />
                                    )
                                }
                            </tbody>
                            {/* foot */}
                            {/* <tfoot>
                                    
                                </tfoot> */}
                        </table>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default CourseSection;
