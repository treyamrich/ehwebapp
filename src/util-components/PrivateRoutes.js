import { Outlet, Navigate } from 'react-router-dom';

import React from 'react'

const PrivateRoutes = ({auth}) => {
  return (
    auth ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes