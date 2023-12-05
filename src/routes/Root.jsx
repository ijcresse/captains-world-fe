//root page that contains and coordinates other elements from other pages
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'

import { ServerProvider } from '../context/ServerContext';
import { ToastProvider } from '../context/ToastContext';
import NavBar from '../components/NavBar';
import Notification from '../components/Notification';
import './css/Root.css'

export default function Root() {

    return(
        <ServerProvider>
            <ToastProvider>
                <Box id="root-top">
                    <NavBar />
                    <Box id="outlet-top">
                        <Outlet />
                    </Box>
                </Box>
                <Notification />
            </ToastProvider>
        </ServerProvider>
    )
}