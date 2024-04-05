import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import AdminMenu from './AdminMenu';

import './css/NavBar.css'

//navigation bar at top of page.
function NavBar() {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const activePageClass = (urlName) => {
        let className = "navbar-item";
        //todo: hacky
        if (location.pathname.includes(urlName) || 
                (urlName === '/reviews' && location.pathname.includes('review'))) {
            className += " navbar-active";
        }
        return className;
    }

    const pages = [
        {
            'name': "Captain's World",
            'url': '/'
        },
        {
            'name': 'Reviews',
            'url': '/reviews'
        }
    ]

    return (
        <div id="navbar-top">
            { pages ? pages.map(page => {
                return (
                    <Link to={page.url} 
                            className={activePageClass(page.url.toLowerCase())} 
                            key={page.url}>
                        {page.name}
                    </Link>)
            }) :
            <></>}
            <AccountCircleIcon sx={{cursor: 'pointer', color: "#1a1b85"}} className="navbar-item" onClick={handleOpen}/>
            {open ? 
                <AdminMenu open={open} handleClose={handleClose} />
                : <></>
            }
        </div>
    )
}

export default NavBar