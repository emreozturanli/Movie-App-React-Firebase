import React from 'react'
import {Outlet} from 'react-router-dom'
const ProtectedRoute = () => {
  return (
    <>
      <div>ProtectedRoute</div>
      <Outlet/>
    </>
  )
}

export default ProtectedRoute