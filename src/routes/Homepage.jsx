import HomeHero from '../components/HomeHero'
import About from '../components/About';
// import Contact from '../components/Contact';

import './css/Homepage.css';
/**
 * Homepage for Captain's World. Contains the following:
 * Hero that links to reviews
 * About
 * Contact
 */

export default function Homepage() {
    return(
        <div id="home-root">
            <HomeHero />
            <About />
        </div>
    )
}