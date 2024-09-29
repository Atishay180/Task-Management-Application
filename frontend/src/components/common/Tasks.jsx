import React from 'react'
import { FaTasks, FaRegListAlt } from "react-icons/fa";
import { MdFileDownloadDone } from "react-icons/md";
import { RiProgress3Line } from "react-icons/ri";


const Tasks = () => {
    return (
        <div className='flex flex-wrap justify-between px-8 py-4'>
            <div className="flex justify-around items-center rounded-lg border border-gray-100 w-full md:w-72 h-28 bg-white p-4 my-3 md:my-1 shadow-md transition hover:shadow-lg">
                <div>
                    <h2 className='pb-1'>Total Tasks</h2>
                    <h1 className="text-4xl font-bold pt-1">17</h1>
                </div>
                <div>
                    <FaTasks className="text-4xl text-blue-500" />
                </div>
            </div>


            <div className="flex justify-around items-center rounded-lg border border-gray-100 w-full md:w-72 bg-white p-4 my-3 md:my-1 shadow-md transition hover:shadow-lg">
                <div className='flex flex-col jusst'>
                    <h2 className='pb-1'>Tasks Completed</h2>
                    <h1 className="text-4xl font-bold pt-1">6</h1>
                </div>
                <div>
                    <MdFileDownloadDone className="text-4xl text-green-500" />
                </div>
            </div>


            <div className="flex justify-around items-center rounded-lg border border-gray-100 w-full md:w-72 bg-white p-4 my-3 md:my-1 shadow-md transition hover:shadow-lg">
                <div className='flex flex-col jusst'>
                    <h2 className='pb-1'>Tasks In Progress</h2>
                    <h1 className="text-4xl font-bold pt-1">4</h1>
                </div>
                <div>
                    <RiProgress3Line className="text-4xl text-yellow-500" />
                </div>
            </div>


            <div className="flex justify-around items-center rounded-lg border border-gray-100 w-full md:w-72 bg-white p-4 my-3 md:my-1 shadow-md transition hover:shadow-lg">
                <div className='flex flex-col jusst'>
                    <h2 className='pb-1'>Tasks To Do</h2>
                    <h1 className="text-4xl font-bold pt-1">7</h1>
                </div>
                <div>
                    <FaRegListAlt className="text-4xl text-red-500" />
                </div>
            </div>
        </div>
    )
}

export default Tasks
