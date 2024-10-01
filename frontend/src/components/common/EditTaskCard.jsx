import React, { useState, useEffect } from 'react';

import PriorityDropdown from '../../dropdown/PriorityDropdown'; 
import useEditTask from '../../hooks/useEditTask';

import { useParams, useNavigate } from 'react-router-dom';

import { FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

const EditTaskCard = () => {
    const navigate = useNavigate();
    const { editTask, loading } = useEditTask();
    const { taskId } = useParams();
    const [task, setTask] = useState({});
    const [inputs, setInputs] = useState({});
    const [editModes, setEditModes] = useState({});
    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`/api/task/${taskId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch task');
                }

                setTask(data.task);
                setInputs({
                    title: data.task.title,
                    priority: data.task.priority,
                    dueDate: data.task.dueDate,
                    status: data.task.status,
                    description: data.task.description,
                });
            } catch (error) {
                toast.error(error.message || 'Something went wrong');
            }
        };

        fetchTask();
    }, [taskId]);

    const handleInputChange = (field, value) => {
        setInputs((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const toggleExpand = (taskId) => {
        setExpanded((prev) => ({
            ...prev,
            [taskId]: !prev[taskId],
        }));
    };

    const toggleEditMode = (field) => {
        setEditModes((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleEdit = async (e) => {
        e.preventDefault();

        const updatedFields = {};

        // Compare inputs with the original task values
        if (inputs.title !== task.title) updatedFields.title = inputs.title;
        if (inputs.priority !== task.priority) updatedFields.priority = inputs.priority;
        if (inputs.dueDate !== task.dueDate) updatedFields.dueDate = inputs.dueDate;
        if (inputs.status !== task.status) updatedFields.status = inputs.status;
        if (inputs.description !== task.description) updatedFields.description = inputs.description;

        // Only call editTask if there are changes
        if (Object.keys(updatedFields).length > 0) {
            await editTask(taskId, updatedFields);
        } else {
            toast.error("No changes detected");
        }

        setEditModes({});
        navigate("/edit");
    };

    return (
        <div className='flex w-full'>
            <div className='w-full m-4 p-6 bg-white rounded-lg shadow-lg'>
                <form onSubmit={handleEdit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm text-gray-600">Title</label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    className={`w-full h-10 bg-transparent placeholder:text-slate-400 text-gray-500 text-sm border border-gray-100 rounded px-3 py-2 transition duration-300 ease focus:outline-none ${editModes.title ? 'shadow-md border-gray-300' : 'hover:border-gray-300 shadow-sm'}`}
                                    value={inputs.title || ''}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    readOnly={!editModes.title}
                                />
                                <FaEdit
                                    className="ml-2 cursor-pointer text-slate-500 hover:text-gray-500"
                                    onClick={() => toggleEditMode('title')}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between flex-wrap">
                            <div className="w-72 py-4">
                                <label className="block mb-1 text-sm text-gray-600">Due Date</label>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        className={`w-full h-10 bg-transparent placeholder:text-slate-400 text-gray-500 text-sm border border-gray-100 rounded px-3 py-2 transition duration-300 ease focus:outline-none ${editModes.dueDate ? 'shadow-md border-gray-300' : 'hover:border-gray-300 shadow-sm'}`}
                                        value={inputs.dueDate ? new Date(inputs.dueDate).toLocaleDateString() : ''}
                                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                                        readOnly={!editModes.dueDate}
                                    />
                                    <FaEdit
                                        className="ml-2 cursor-pointer text-slate-500 hover:text-gray-500"
                                        onClick={() => toggleEditMode('dueDate')}
                                    />
                                </div>
                            </div>

                            <div className="w-72 py-4">
                                <label className="block mb-1 text-sm text-gray-600">Priority</label>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        className={`w-full h-10 bg-transparent placeholder:text-slate-400 text-gray-500 text-sm border border-gray-100 rounded px-3 py-2 transition duration-300 ease focus:outline-none ${editModes.priority ? 'shadow-md border-gray-300' : 'hover:border-gray-300 shadow-sm'}`}
                                        value={inputs.priority || ''}
                                        readOnly={!editModes.priority}
                                    />
                                    <FaEdit
                                        className="ml-2 cursor-pointer text-slate-500 hover:text-gray-500"
                                        onClick={() => toggleEditMode('priority')}
                                    />
                                    {editModes.priority && (
                                        <PriorityDropdown
                                            options={['High', 'Medium', 'Low']}
                                            onSelect={(priority) => handleInputChange('priority', priority)}
                                            initialValue={inputs.priority}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="w-72 py-4">
                                <label className="block mb-1 text-sm text-gray-600">Status</label>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        className={`w-full h-10 bg-transparent placeholder:text-slate-400 text-gray-500 text-sm border border-gray-100 rounded px-3 py-2 transition duration-300 ease focus:outline-none ${editModes.status ? 'shadow-md border-gray-300' : 'hover:border-gray-300 shadow-sm'}`}
                                        value={inputs.status || ''}
                                        readOnly={!editModes.status}
                                    />
                                    <FaEdit
                                        className="ml-2 cursor-pointer text-slate-500 hover:text-gray-500"
                                        onClick={() => toggleEditMode('status')}
                                    />
                                    {editModes.status && (
                                        <PriorityDropdown
                                            options={['To Do', 'In Progress', 'Completed']}
                                            onSelect={(status) => handleInputChange('status', status)}
                                            initialValue={inputs.status}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 text-sm text-gray-600">Description</label>
                            <div className="relative flex items-center">
                                <textarea
                                    className={`w-full relative bg-transparent placeholder:text-slate-400 text-gray-500 text-sm border border-gray-100 rounded px-3 py-2 transition duration-300 ease focus:outline-none ${editModes.description ? 'shadow-md border-gray-300' : 'hover:border-gray-300 shadow-sm'} ${expanded[task.id] ? '' : 'line-clamp-3 overflow-hidden'}`}
                                    value={inputs.description || ''}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    readOnly={!editModes.description}
                                    rows={expanded[task.id] ? 12 : 6}
                                />
                                <FaEdit
                                    className="ml-2 cursor-pointer text-slate-500 hover:text-gray-500"
                                    onClick={() => toggleEditMode('description')}
                                />
                            </div>
                            <button
                                className="text-blue-500 text-xs mt-1"
                                onClick={() => toggleExpand(task.id)}
                                type="button"
                            >
                                {expanded[task.id] ? 'Read Less' : 'Read More'}
                            </button>
                        </div>

                        <button type='submit' className="w-full text-sm flex items-center justify-center bg-primary rounded hover:bg-pink-600 text-white py-3 px-6 mt-4">
                            {loading ? 'Loading...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskCard;
