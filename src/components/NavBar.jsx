import { Link, useLocation } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './css/NavBar.css'

//navigation bar at top of page.
function NavBar({handleOpen}) {
    const location = useLocation();

    const activePageClass = (pageName) => {
        let className = "navbar-item";
        //todo: hacky
        if (location.pathname.includes(pageName) || (pageName === 'reviews' && location.pathname.includes('review'))) {
            className += " navbar-active";
        }
        return className;
    }

    const pages = [
        {
            'name': 'Home',
            'url': '/home'
        },
        {
            'name': 'Reviews',
            'url': '/reviews'
        },
        {
            'name': 'Contact',
            'url': '/contact'
        },
        {
            'name': 'About',
            'url': '/about'
        }
    ]

    return (
        <div id="navbar-top">
            { pages ? pages.map(page => {
                return (<Link to={page.url} className={activePageClass(page.name.toLowerCase())} key={page.url}>{page.name}</Link>)
            }) :
            <></>}
            <AccountCircleIcon sx={{cursor: 'pointer', color: "#1a1b85"}} className="navbar-item" onClick={handleOpen}/>
        </div>
    )
}

export default NavBar