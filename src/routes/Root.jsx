//root page that contains and coordinates other elements from other pages
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'

import { ServerProvider } from '../context/ServerContext';
import NavBar from '../components/NavBar'
import './css/Root.css'

export default function Root() {

    return(
        <ServerProvider>
            <Box id="root-top">
                <NavBar />
                <Box id="outlet-top">
                    <Outlet />
                </Box>
            </Box>
        </ServerProvider>
    )
}