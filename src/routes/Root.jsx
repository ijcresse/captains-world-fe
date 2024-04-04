//root page that contains and coordinates other elements from other pages
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { ServerProvider } from '../context/ServerContext';
import { ToastProvider } from '../context/ToastContext';
import NavBar from '../components/NavBar';
import Notification from '../components/Notification';
import Logo from '../components/Logo';
import './css/Root.css';

/*
cypress sapwood: rgb(219, 180, 141)
porcelain white: rgb(246, 246, 246)
kikichoko indigo: rgb(26,27, 133)
*/

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(26,27,133,0.87)',
      contrastText: '#f6f6f6',
    },
    secondary: {
      main: '#9c27b0',
    },
    text: {
      primary: 'rgba(26,27,133,0.87)',
      secondary: 'rgba(26,27,133,0.5)',
      disabled: 'rgba(18,18,93,0.2)',
      hint: '#4e4e4e',
    },
    background: {
      paper: '#f6f6f6',
      default: '#dbb48d',
    },
  },
});

export default function Root() {
    return(
        <ThemeProvider theme={theme} >
            <ServerProvider>
                <ToastProvider>
                    <div id="root-top">
                        <NavBar/>
                        <div id="outlet-top">
                            <Outlet />
                        </div>
                        <Logo transparency={true} />
                    </div>
                    <Notification />
                </ToastProvider>
            </ServerProvider>
        </ThemeProvider>
    )
}