//navigation bar at top of page
import { Link } from 'react-router-dom'


function NavBar() {
    return (
        <>
            NavBar
            <Link to={`/home`}>Homepage</Link>
            <Link to={`/reviews`}>Reviews</Link>
            <Link to={`/contact`}>Contact</Link>
            <Link to={`/about`}>About</Link>
        </>
    )
}

export default NavBar