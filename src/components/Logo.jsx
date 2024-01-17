//simple logo component. detects route to determine opacity
import './css/Logo.css';

export default function Logo({transparency}) {

    function setStyle(text) {
        if (transparency) {
            return text + " logo-transparent";
        } else {
            return text;
        }
    }

    return(
        <div className={setStyle("logo-top")}>
            <img className={setStyle("logo-img")} src={'../../captain.png'} />
            <img className={setStyle("logo-name")} src={'../../captains_world.png'} />
        </div>
    )
}