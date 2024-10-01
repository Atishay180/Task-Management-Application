import React, { useState, useRef, useEffect } from 'react';
import { FiClock } from "react-icons/fi";
import { RiProgress3Line } from "react-icons/ri";
import { MdOutlineDownloadDone } from "react-icons/md";

const TaskList = ({ currentTasks }) => {

    return (
        <div className="w-full bg-gray-100 rounded-lg h-[300px] md:h-[400px] flex-grow overflow-y-auto">
            {currentTasks && currentTasks.length === 0 && (
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 text-lg">No tasks Present</p>
                </div>
            )}
            {currentTasks && currentTasks.map((task, index) => (
                <div key={index} className="my-3 flex md:justify-between items-center bg-white rounded-xl shadow-md overflow-hidden p-4">
                    <div className="p-4 w-full md:w-3/5">
                        <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>

                        {/* Description Component */}
                        <DescriptionWithReadMore description={task.description} />

                        <div className="mt-4">
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold">Due Date:</span> {new Date(task.dueDate).toLocaleDateString()}
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
                                    {task.assignedUsers.length === 0 && (<li>0</li>)}
                                    {task.assignedUsers.length > 0 && task.assignedUsers.map((user, userIndex) => (
                                        <li key={userIndex} className="text-gray-600">
                                            {user.fullName}
                                            {" "}
                                            {`(${user.email})`}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='text-center hidden md:block pr-20'>
                        {task.status === 'To Do' && <FiClock className='text-9xl text-red-500' />}
                        {task.status === 'In Progress' && <RiProgress3Line className='text-9xl text-yellow-500' />}
                        {task.status === 'Completed' && <MdOutlineDownloadDone className='text-9xl text-green-500' />}
                    </div>
                </div>
            ))}
        </div>
    );
};

const DescriptionWithReadMore = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const descriptionRef = useRef(null);

    useEffect(() => {
        if (descriptionRef.current) {
            // Check if the content overflows beyond 2 lines
            setIsOverflowing(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
        }
    }, []);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="mt-2">
            <textarea
                ref={descriptionRef}
                value={description}
                readOnly
                className="w-full text-gray-600 rounded-lg"
                rows={isExpanded ? 6 : 2}
                style={{ resize: 'none', overflow: 'hidden' }}
            />
            {isOverflowing && (
                <button
                    onClick={toggleExpand}
                    className="mt-2 text-blue-500 hover:text-blue-700 text-sm"
                >
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </div>
    );
};

export default TaskList;
