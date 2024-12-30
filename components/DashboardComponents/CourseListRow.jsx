import Image from "next/image";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import useCrud from "../../utilities/Hooks/useCrud";
import { FaStar } from "react-icons/fa";




const CourseListRow = ({ course }) => {
    const { handleRemove } = useCrud();
    return (

        <tr className="mt-1 ">
            <td className='dark:bg-slate-600 bg-slate-200'>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask rounded-md w-12 h-12">
                            <Image
                                width={50}
                                height={50}
                                alt={course?.name}
                                src={course?.image}
                            >

                            </Image>
                        </div>
                    </div>
                </div>
            </td>
            <td className='dark:bg-slate-600 bg-slate-200 ' >
                {course?.title}
            </td>

            <td className='dark:bg-slate-600  bg-slate-200'><span className="font-semibold">৳</span> {course?.price}</td>
            <td className='dark:bg-slate-600  bg-slate-200'>
                <div className="flex items-center gap-1">
                    <FaStar></FaStar>
                    <div>
                        {course?.rating}
                    </div>
                </div></td>
            <td className='dark:bg-slate-600  bg-slate-200'>{course?.category}</td>
            <td className='dark:bg-slate-600  bg-slate-200'>
                <Link href={`/dashboard/courses/edit-course/${course._id}`} passHref>
                    <button >
                        <FaEdit className='h-6 w-6 hover:text-blue-500'></FaEdit>
                    </button>
                </Link>
            </td>
            <td className='dark:bg-slate-600 bg-slate-200'>
                <button >
                    <MdDeleteForever onClick={() => handleRemove(course._id, 'course')} className='h-6 w-6 hover:text-rose-500'></MdDeleteForever>
                </button>
            </td>

        </tr>


    );
};

export default CourseListRow;