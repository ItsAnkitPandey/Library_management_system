import React from 'react'
import Cards from './components/Cards'
import Sidebar from './components/Sidebar'

const AdminDashboard = ({adminLogout}) => {
  return (
    <div>
      <Sidebar adminLogout={adminLogout}/>
      <Cards/>
    </div>
  )
}

export default AdminDashboard
