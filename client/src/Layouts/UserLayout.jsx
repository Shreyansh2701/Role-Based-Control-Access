import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

export default function UserLayout() {
    const user = useSelector((state) => state.auth.user);
    const navgiate = useNavigate();
    

    useEffect(()=>{
        if (!user) {
            navgiate('/login');
        }
    },[user])
  return (
    <>
        <Outlet />
    </>
  )
}
