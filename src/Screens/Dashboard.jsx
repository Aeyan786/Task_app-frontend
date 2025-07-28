import Sidebar from '@/components/Dashboard/Sidebar'
import TaskDashboard from '@/components/Dashboard/TaskDashboard'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='w-full md:w-64 bg-white shadow-md border-r'>
        <Sidebar />
      </div>

      <div className='flex-1 p-4 sm:p-6'>
        <TaskDashboard />
      </div>
    </div>
  )
}

export default Dashboard
