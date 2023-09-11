import { Link } from 'react-router-dom'
import './css/NavBar.css'

//navigation bar at top of page.
function NavBar() {

    const pages = [
        {
            'name': 'Homepage',
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
                return (<Link to={page.url} key={page.url}>{page.name}</Link>)
            }) :
            <></>}
        </div>
    )
}

export default NavBar