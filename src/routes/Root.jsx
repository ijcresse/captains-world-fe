//root page that contains and coordinates other elements from other pages

import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

export default function Root() {
    return(
        <>
            <NavBar />
            <Outlet />
        </>
    )
}