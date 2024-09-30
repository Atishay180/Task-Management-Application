import React from 'react'

import Navbar from '../../components/common/Navbar';
import Tasks from '../../components/common/Tasks';
import TaskPagination from '../../components/common/TaskPagination';

const Home = () => {

  return (
    <div className='w-full'>
      <Navbar />
      <Tasks />
      <TaskPagination />
    </div>
  )
}

export default Home
