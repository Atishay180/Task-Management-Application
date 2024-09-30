import React from 'react'

import Sidebar from '../../components/common/Sidebar';
import Navbar from '../../components/common/Navbar';
import Tasks from '../../components/common/Tasks';
import TaskList from '../../components/common/TaskList';
import CreateTask from '../../components/crud/CreateTask';

const Home = () => {
  return (
    <div className='flex bg-gray-100'>
      <Sidebar />


      <div className='w-full'>
        <Navbar />

        <Tasks />
        <TaskList />

        {/* <CreateTask /> */}
      </div>
    </div>
  )
}

export default Home
