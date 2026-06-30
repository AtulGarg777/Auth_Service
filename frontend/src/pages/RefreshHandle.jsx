import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandle({ setIsAuthenticated }) {

    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('Token')) {
            setIsAuthenticated(true);
            if (location.pathname == '/' || location.pathname == '/login' || location.pathname == '/signup') {
                navigate('/home', { replace: false })
            }
        }else{
            setIsAuthenticated(false)
        }
    }, [location, setIsAuthenticated])

    return (
        null
    )
}

export default RefreshHandle
