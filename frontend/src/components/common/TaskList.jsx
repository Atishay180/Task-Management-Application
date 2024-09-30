import React from 'react';
const TaskList = ({currentTasks}) => {

    return (
        <div className="bg-gray-100 rounded-lg h-[300px] md:h-[400px] flex-grow overflow-y-auto">
            {currentTasks && currentTasks.map((task, index) => (
                <div key={index} className="my-3 bg-white rounded-xl shadow-md overflow-hidden p-4">
                    <div className="p-4">
                        <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
                        <p className="mt-2 text-gray-600">{task.description}</p>
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
                                    {task.assignedUsers.map((user, userIndex) => (
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
                </div>
            ))}
        </div>

    );
};

export default TaskList;
