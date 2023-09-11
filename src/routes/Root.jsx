//root page that contains and coordinates other elements from other pages

import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import './css/Root.css'

export default function Root() {
    return(
        <div id="root-top">
            <NavBar />
            <Outlet />
        </div>
    )
}