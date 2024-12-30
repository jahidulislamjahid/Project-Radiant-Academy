import React from 'react';
import { useSelector } from 'react-redux';


const CounterSection = () => {
    const allCourses = useSelector((state) => state.courses.coursesList);
    const totalUsers = useSelector((state) => state.users.usersList);
    const totalForums = useSelector((state) => state.forums.forumsList)    
    const thisUser = useSelector((state) => state.loginUser.loginUser)
    console.log(thisUser);
    


    return (
        <div className="p-20 bg-white dark:bg-slate-800 mx-auto">
            <div className="w-6/6 grid pb-14 pt-10 px-5 lg:grid-cols-3 gap-2 h-full mx-auto">
                <div className="flex justify-center">
                    <div className="text-center px-3 mb-8 sm:mb-3">
                        <h1 className="text-5xl text-rose-500 font-bold mb-3">
                            {allCourses?.length}
                        </h1>
                        <h3 className="text-2xl font-bold text-violet-800 dark:text-violet-400">
                            Total Courses
                        </h3>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="text-center px-3 mb-8 sm:mb-3">
                        <h1 className="text-5xl text-rose-500 font-bold mb-3">
                            {totalUsers?.length}
                        </h1>
                        <h3 className="text-2xl font-bold text-violet-800 dark:text-violet-400">
                            Our Users
                        </h3>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="text-center px-3 mb-8 sm:mb-3">
                        <h1 className="text-5xl text-rose-500 font-bold mb-3">
                            {totalForums?.length}
                        </h1>
                        <h3 className="text-2xl font-bold text-violet-800 dark:text-violet-400">
                        Total Forum posts
                        </h3>

                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default CounterSection;