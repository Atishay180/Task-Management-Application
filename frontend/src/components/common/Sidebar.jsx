import React from 'react'
import { NavLink } from "react-router-dom"

import { IoIosAddCircle } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useAuthContext } from '../../context/AuthContext';

const Sidebar = () => {
    const { authUser, sidebarBtn, setSidebarBtn } = useAuthContext();

    const handleBtn = (btn) => () => {
        setSidebarBtn(btn);
    }

    return (
        <div className="fixed flex h-screen w-40 md:w-52 flex-col justify-between border-e bg-white">
            <div className="px-4 py-3">
                <span className="grid h-10 w-full text-sm md:text-lg text-center font-bold place-content-center rounded-lg bg-gray-100 text-gray-600">
                    Task-Management
                </span>

                <ul className="mt-6 space-y-3 flex flex-col items-between">
                    <li>
                        <NavLink to="/" onClick={handleBtn('dashboard')} className={`flex justify-evenly items-center rounded-lg px-4 py-2 font-medium text-gray-700 ${sidebarBtn === 'dashboard' ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-100`}>
                            <MdDashboard className='text-3xl text-primary' />

                            <h2 className="w-24 hidden md:block">
                                Dashboard
                            </h2>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/create" onClick={handleBtn('create')} className={`flex justify-evenly items-center rounded-lg px-4 py-2 font-medium text-gray-700 ${sidebarBtn === 'create' ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-100`}>
                            <IoIosAddCircle className='text-3xl text-green-500' />

                            <h2 className="w-24 hidden md:block">
                                Create Task
                            </h2>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/edit" onClick={handleBtn('edit')} className={`flex justify-evenly items-center rounded-lg px-4 py-2 font-medium text-gray-700 ${sidebarBtn === 'edit' ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-100`}>
                            <RiEditFill className='text-3xl text-blue-500' />

                            <h2 className="w-24 hidden md:block">
                                Edit Task
                            </h2>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/remove" onClick={handleBtn('remove')} className={`flex justify-evenly items-center rounded-lg px-4 py-2 font-medium text-gray-700 ${sidebarBtn === 'remove' ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-100`}>
                            <MdDeleteForever className='text-3xl text-red-500' />

                            <h2 className="w-24 hidden md:block">
                                Remove Task
                            </h2>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-4 hover:bg-gray-50">

                    {/* user info */}
                    <FaUser className='text-xl text-gray-700' />
                    <p className="text-xs text-center lg:text-left">
                        <strong className="block font-medium">{authUser?.fullName}</strong>

                        <span className='hidden md:block'>{authUser?.email}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
