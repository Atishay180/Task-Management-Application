import React, { useState } from 'react';
import { tasks } from './test';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";

const TaskList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;

    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="flex flex-col px-8">
            {/* Heading */}
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Tasks:</h1>

            {/* Pagination buttons */}
            <div className="flex justify-between items-center mb-4">
                <FaArrowLeft
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    className={`text-black rounded cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                />

                <p className="text-gray-600">Page {currentPage} of {totalPages}</p>

                <button className="bg-primary px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded-md">
                    <span>Sort</span>
                    <TiArrowSortedDown className='text-xl' />
                </button>

                <FaArrowRight
                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                    className={`text-black rounded cursor-pointer ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
            </div>

            {/* Task List */}
            <div className="bg-gray-100 rounded-lg h-[300px] md:h-[400px] flex-grow overflow-y-auto">
                {currentTasks.map((task, index) => (
                    <div key={index} className="my-3 bg-white rounded-xl shadow-md overflow-hidden p-4">
                        <div className="p-4">
                            <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
                            <p className="mt-2 text-gray-600">{task.description}</p>
                            <div className="mt-4">
                                <p className="text-sm text-gray-500">
                                    <span className="font-semibold">Due Date:</span> {task.dueDate}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-semibold">Status:</span> {task.status}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-semibold">Priority:</span> {task.priority}
                                </p>
                                <div className="mt-4">
                                    <p className="font-semibold text-gray-700">Assigned Users:</p>
                                    <ul className="list-disc list-inside">
                                        {task.assignedUsers.map((user, userIndex) => (
                                            <li key={userIndex} className="text-gray-600">{user}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
