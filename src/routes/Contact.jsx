//contact information for captain's world admin
import './css/Contact.css'
import { Typography } from '@mui/material';

export default function Contact() {
    return(
        <div id="contact-top">
            <div className="contact-text-container">
                <h3 className="contact-text">to contact me:</h3>
                <h3 className="contact-email">reinsch0079@gmail.com</h3>
            </div>
            <div className="contact-img">
                <img src={'../../contact.png'} />
            </div>
        </div>
    )
}