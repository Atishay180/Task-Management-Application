import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Dropdown from '../../dropdown/Dropdown';
import useFilterTasks from '../../hooks/useFilterTasks';
import { useAuthContext } from '../../context/AuthContext';
import TaskList from './TaskList';

const TaskPagination = () => {
    const { filteredTasks, filterTasks, loading } = useFilterTasks();
    const { selectedFilter } = useAuthContext();

    useEffect(() => {
        filterTasks(selectedFilter);
    }, [selectedFilter]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const tasksPerPage = 3;
    const totalPages = Math.ceil(filteredTasks?.length / tasksPerPage);
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[300px]">
                <p className="text-gray-600">Loading...</p>
            </div>
        );
    }

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

                <Dropdown name="Filter by" options={['All', 'To Do', 'In Progress', 'Completed', 'High', 'Medium', 'Low']} />

                <FaArrowRight
                    onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                    className={`text-black rounded cursor-pointer ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
            </div>

            {/* Task List */}
            <TaskList currentTasks={currentTasks} />
        </div>
    )
}

export default TaskPagination
