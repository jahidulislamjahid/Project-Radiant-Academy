import React from 'react';
import { FaBookmark, FaHeart, FaPenNib, FaPlus, FaTrash, FaUsers } from "react-icons/fa";
import { useSelector } from 'react-redux';
import DashboardSidebar from './DashboardSidebar';

const AccountsSection = () => {
    const allUsers = useSelector((state) => state.users.usersList);

    return (
        <div className="px-0 sm:px-6 lg:px-12 bg-white dark:bg-slate-800">
            <div className="grid grid-rows-1 md:grid-cols-[250px_minmax(300px,_1fr)] lg:grid-cols-[250px_minmax(600px,_1fr)] p-8 gap-5">
                <div>
                    <DashboardSidebar />
                </div>

                <div className="bg-slate-100 dark:bg-slate-700 dark:text-slate-200 shadow-md rounded-md py-8 px-5 h-auto">
                    <div className="flex justify-between items-center px-3 mb-4">
                        <h3 className="text-2xl flex items-center"><FaUsers className="mr-3" /> Accounts</h3>
                        <button className="flex items-center btn"><FaPlus className="text-sm mr-2" /> Add Accounts</button>
                    </div>
                    <section className="overflow-x-auto">
                        <table className="table w-full bg-slate-200 overflow-scroll">
                            <tbody>
                                {
                                    allUsers.data.map(user => (
                                        <tr className="bg-slate-200" key={user._id}>
                                            <td colSpan={2} className="font-semibold">{user.name}</td>
                                            <td>
                                                <span className="flex items-center">
                                                    <FaBookmark className="text-orange-500 mr-1.5" /> Collaborator
                                                </span>
                                            </td>
                                            <td>
                                                <span className="flex items-center">
                                                    <FaPenNib className="mr-1.5 text-purple-800" /> 12
                                                </span>
                                            </td>
                                            <td>
                                                <span className="flex items-center">
                                                    <FaHeart className="mr-1.5 text-red-500" /> 1304
                                                </span>
                                            </td>
                                            <td className="text-center text-green-600">Approved</td>
                                            <td>
                                                <button>
                                                    <FaTrash className="hover:text-red-500" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AccountsSection;