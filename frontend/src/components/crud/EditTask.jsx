import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const EditTask = () => {
  const [expanded, setExpanded] = useState({});
  const { tasks, loading } = useAuthContext();
  const navigate = useNavigate();

  const toggleExpand = (taskId) => {
    setExpanded((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleEdit = (taskId) => {
    navigate(`/${taskId}`);
  };

  if (loading) {
    return <div className='w-full h-screen flex items-center justify-center'>Loading...</div>;
  }
  return (
    <div className='ml-44 md:ml-56 flex items-start justify-evenly flex-wrap h-screen overflow-y-auto'>
      {tasks &&
        tasks.length > 0 &&
        tasks.map((task, index) => (
          <div key={index} className='w-96 m-4 p-6 bg-white rounded-lg shadow-xl relative'>
            {/* Delete Icon */}
            <FaEdit
              className="absolute top-2 right-2 text-2xl cursor-pointer text-black hover:text-gray-500"
              onClick={() => handleEdit(task._id)}
            />
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1 text-sm text-gray-600">Title</label>
                <input
                  type="text"
                  className="w-full h-10 bg-transparent text-gray-500 text-sm border border-gray-100 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-300 hover:border-gray-300 shadow-sm focus:shadow-md"
                  value={task.title}
                  readOnly
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-sm text-gray-600">Priority</label>
                <input
                  type="text"
                  className="w-full h-10 bg-transparent placeholder:text-slate-400 text-gray-500 text-sm border border-gray-100 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-300 hover:border-gray-300 shadow-sm focus:shadow-md"
                  value={task.priority}
                  readOnly
                />
              </div>

              <div className="flex">
                <div className="w-1/2 mr-2">
                  <label className="block font-semibold mb-1 text-sm text-gray-600">Due Date</label>
                  <input
                    type="text"
                    className="w-full h-10 bg-transparent placeholder:text-slate-400 text-gray-500 text-sm border border-gray-100 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-300 hover:border-gray-300 shadow-sm focus:shadow-md"
                    value={new Date(task.dueDate).toLocaleDateString()}
                    readOnly
                  />
                </div>

                <div className="w-1/2">
                  <label className="block font-semibold mb-1 text-sm text-gray-600">Status</label>
                  <input
                    type="text"
                    className="w-full h-10 bg-transparent placeholder:text-slate-400 text-gray-500 text-sm border border-gray-100 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-300 hover:border-gray-300 shadow-sm focus:shadow-md"
                    value={task.status}
                    readOnly
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-sm text-gray-600">Assigned Users</label>
                {task.assignedUsers && task.assignedUsers.length > 0 ? (
                  <ul className="list-disc pl-5 text-sm text-gray-500 h-5 overflow-y-auto">
                    {task.assignedUsers.map((user, idx) => (
                      <li key={idx}>{user.email}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No users assigned</p>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-1 text-sm text-gray-600">Description</label>
                <textarea
                  className={`w-full bg-transparent placeholder:text-slate-400 text-gray-500 text-sm border border-gray-100 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-300 hover:border-gray-300 shadow-sm focus:shadow-md ${expanded[task.id] ? '' : 'line-clamp-3 overflow-hidden'}`}
                  value={task.description}
                  readOnly
                  rows={expanded[task.id] ? 6 : 3}
                />
                <button
                  className="text-blue-500 text-xs mt-1"
                  onClick={() => toggleExpand(task.id)}
                  type="button"
                >
                  {expanded[task.id] ? 'Read Less' : 'Read More'}
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default EditTask
