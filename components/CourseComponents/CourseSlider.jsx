import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CourseCard from './CourseCard';
import { useSelector } from 'react-redux';

const CourseSlider = ({ allCourses, category }) => {
    const thisUser = useSelector((state) => state.loginUser.loginUser)

    return (
        <>
                {
                    !thisUser &&
                    <h1 className='font-bold text-rose-500 animate-[pulse_1s_ease-in-out_infinite] mb-5 text-center'>**** Plese Login to see Courses ***</h1>
                }
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
               
                    {
                        allCourses.filter(course => {
                            if (category === '') {
                                return course;
                            }
                            else if (course.category.toString() === category) {
                                return course;
                            }
                        }).map(course => <CourseCard
                            key={course._id}
                            course={course}
                        />)
                    }
                

               
            </div>
        </>
    );
};

export default CourseSlider;