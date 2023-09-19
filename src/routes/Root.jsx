//root page that contains and coordinates other elements from other pages
import { createContext } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../components/NavBar'
import './css/Root.css'

const RootContext = createContext({});

export default function Root() {

    const axiosInstance = axios.create();

    return(
        <RootContext.Provider value={axiosInstance}>
            <div id="root-top">
                <NavBar />
                <div id="outlet-top">
                    <Outlet />
                </div>
            </div>
        </RootContext.Provider>
    )
}

export { RootContext }