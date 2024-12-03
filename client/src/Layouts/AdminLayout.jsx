import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
export default function AdminLayout() {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(()=> {
        if(!user || user.role !== 'admin'){
            navigate('/login');
        }
    },[user])
    
  return (
    <>
        <Outlet />
    </>
  )
}
