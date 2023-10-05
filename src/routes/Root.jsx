//root page that contains and coordinates other elements from other pages
import { createContext } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Box from '@mui/material/Box'

import NavBar from '../components/NavBar'
import './css/Root.css'

const RootContext = createContext({});

export default function Root() {

    const axiosInstance = axios.create();

    return(
        <RootContext.Provider value={axiosInstance}>
            <Box id="root-top">
                <NavBar />
                <Box id="outlet-top">
                    <Outlet />
                </Box>
            </Box>
        </RootContext.Provider>
    )
}

export { RootContext }