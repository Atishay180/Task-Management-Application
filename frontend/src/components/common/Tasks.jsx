import React, { useEffect } from 'react'
import { FaTasks, FaRegListAlt } from "react-icons/fa";
import { MdFileDownloadDone } from "react-icons/md";
import { RiProgress3Line } from "react-icons/ri";
import useTasks from '../../hooks/useTasks';


const Tasks = () => {
    const { tasks, getTasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
    const toDoTasks = tasks.filter(task => task.status === 'To Do').length;

    return (
        <div className='flex flex-wrap justify-between px-8 py-4'>
            <div className="flex justify-around items-center rounded-lg border border-gray-100 w-full md:w-72 h-28 bg-white p-4 my-3 md:my-1 shadow-md transition hover:shadow-lg">
                <div>
                    <h2 className='pb-1'>Total Tasks</h2>
                    <h1 className="text-4xl font-bold pt-1">{totalTasks}</h1>
                </div>
                <div>
                    <FaTasks className="text-4xl text-blue-500" />
                </div>
            </div>


            <div className="flex justify-around items-center rounded-lg border border-gray-100 w-full md:w-72 bg-white p-4 my-3 md:my-1 shadow-md transition hover:shadow-lg">
                <div className='flex flex-col jusst'>
                    <h2 className='pb-1'>Tasks Completed</h2>
                    <h1 className="text-4xl font-bold pt-1">{completedTasks}</h1>
                </div>
                <div>
                    <MdFileDownloadDone className="text-4xl text-green-500" />
                </div>
            </div>


            <div className="flex justify-around items-center rounded-lg border border-gray-100 w-full md:w-72 bg-white p-4 my-3 md:my-1 shadow-md transition hover:shadow-lg">
                <div className='flex flex-col jusst'>
                    <h2 className='pb-1'>Tasks In Progress</h2>
                    <h1 className="text-4xl font-bold pt-1">{inProgressTasks}</h1>
                </div>
                <div>
                    <RiProgress3Line className="text-4xl text-yellow-500" />
                </div>
            </div>


            <div className="flex justify-around items-center rounded-lg border border-gray-100 w-full md:w-72 bg-white p-4 my-3 md:my-1 shadow-md transition hover:shadow-lg">
                <div className='flex flex-col jusst'>
                    <h2 className='pb-1'>Tasks To Do</h2>
                    <h1 className="text-4xl font-bold pt-1">{toDoTasks}</h1>
                </div>
                <div>
                    <FaRegListAlt className="text-4xl text-red-500" />
                </div>
            </div>
        </div>
    )
}

export default Tasks
