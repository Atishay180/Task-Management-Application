import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import PriorityDropdown from '../../dropdown/PriorityDropdown';
import useCreateTask from '../../hooks/useCreateTask';

const CreateTask = () => {
    const { createTask, loading } = useCreateTask();

    const [input, setInput] = useState({
        priority: 'High',
        dueDate: '',
        title: '',
        description: '',
        assignedUsers: []
    })

    const [searchResult, setSearchResult] = useState('');
    const [searchedUser, setSearchedUser] = useState({});

    const handleUserSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: searchResult })
            })

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Something went wrong');
                return;
            }

            setSearchedUser(data.user);
            setSearchResult('');
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        }
    }

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const userIds = input.assignedUsers.map((user) => user._id);

        await createTask({
            ...input,
            assignedUsers: userIds,
        });

        setInput({
            priority: 'High',
            dueDate: '',
            title: '',
            description: '',
            assignedUsers: []
        })
    }

    return (
        <div className="ml-44 md:ml-56 w-full p-4 mt-3 flex flex-col items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg sm:w-[80%] w-[90%] mx-auto">

                {/* Header */}
                <div className='pt-5 flex justify-center'>
                    <span className="grid h-10 w-full md:text-2xl text-center font-bold place-content-center bg-gray-100 text-gray-600">
                        Create Task
                    </span>
                </div>

                <form onSubmit={handleCreateUser} className="p-5">
                    <div className="flex flex-wrap md:flex-row flex-col md:px-5 justify-between md:items-center">

                        {/* priority and due date */}
                        <label className="text-xl">Priority : </label>
                        <PriorityDropdown options={['High', 'Medium', 'Low']} 
                        onSelect={(priority) => setInput({ ...input, priority })} 
                        initialValue={input.priority}
                        />

                        <label htmlFor="full-name" className="text-xl mt-3 p-2 md:mt-0">Due Date : </label>
                        <input
                            value={input.dueDate}
                            onChange={(e) => setInput({ ...input, dueDate: e.target.value })}
                            type="date" name="email-id" placeholder="Enter your email"
                            className="bg-gray-100 md:w-[35%] w-1/1 px-4 py-2 rounded-xl" />
                    </div>

                    {/* Title and Description */}
                    <div className="md:p-5 p-1 sm:mt-1 mt-1">

                        <div className="md:mt-1 mt-2">
                            <label htmlFor="subject" className="text-xl">Title : </label><br />
                            <input
                                value={input.title}
                                onChange={(e) => setInput({ ...input, title: e.target.value })}
                                type="text" name="subject" placeholder="Enter your title"
                                className="bg-gray-100 w-[100%] px-4 py-2 mt-1 rounded-xl" />
                        </div>
                        <div className="mt-5">
                            <label htmlFor="subject" className="text-xl">Description : </label><br />
                            <textarea
                                value={input.description}
                                onChange={(e) => setInput({ ...input, description: e.target.value })}
                                name="message" rows="5" placeholder="Write your description here"
                                className="bg-gray-100 w-[100%] px-4 py-2 rounded-xl appearance-none text-heading text-md"
                                autoComplete="off" spellCheck="false">

                            </textarea>
                        </div>
                    </div>

                    {/* Add Users */}
                    <div className='flex justify-between'>
                        {/* left part */}
                        <div className="p-4">
                            <label htmlFor="email-search" className="text-xl md:mb-0 mb-1">Add Users: </label>

                            <div className="flex flex-col md:flex-row gap-3">
                                <input
                                    value={searchResult}
                                    onChange={(e) => setSearchResult(e.target.value)}
                                    type="email"
                                    name="email"
                                    id="email-search"
                                    placeholder="Enter email"
                                    className="bg-gray-100 w-full px-4 py-2 rounded-xl"
                                />
                                <button
                                    onClick={handleUserSearch}
                                    type='button'
                                    className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                                >
                                    Search
                                </button>

                            </div>

                            {/* Display searched user */}
                            {searchedUser && searchedUser.email && (
                                <div className="flex items-center justify-start px-2 py-1">
                                    <h1 className=" p-2 font-semibold text-gray-600">{searchedUser.email}</h1>
                                    <IoMdAddCircleOutline
                                        onClick={() => {
                                            setInput({
                                                ...input,
                                                assignedUsers: [...input.assignedUsers, searchedUser]
                                            })
                                            setSearchedUser({})
                                        }}
                                        className="text-gray-600 text-2xl cursor-pointer hover:text-gray-500"
                                    />
                                </div>
                            )}
                        </div>

                        {/* right part: added users list */}
                        <div className='pr-16'>
                            {input.assignedUsers.length > 0 && <label htmlFor="email-search" className="text-xl text-gray-600 font-semibold underline">Users Added: </label>}
                            <ul>
                                {input.assignedUsers.map((user, index) => (
                                    <li key={index} className="flex items-center justify-start py-1" >
                                        <CiCircleMinus
                                        className='text-red-500 text-2xl mx-1 cursor-pointer hover:text-red-600'
                                            onClick={() => {
                                                const newUsers = input.assignedUsers.filter((u) => u.email !== user.email);
                                                setInput({ ...input, assignedUsers: newUsers })
                                            }
                                            }
                                            />
                                        <h1 className="font-semibold text-gray-600">{user.email}</h1>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="btn mt-2 w-[100%] bg-transparent flex items-center">
                        <button type="submit"
                            className="px-4 py-2 mx-auto rounded-lg font-semibold text-center text-xl bg-primary text-white hover:bg-pink-600 shadow-md">
                            {loading ? "Loading..." : "Create Task"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTask
