import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp, faYoutube } from "@fortawesome/free-brands-svg-icons";

const SocialMedia = ({ showMessage = true }) => {
    return (
        <div className="social_media-container">
            {showMessage && <span className="social_media-message">Nuestras redes sociales:</span>}
            <div className='social-media'>
                <ul className="social-icons">
                    <li className="icon facebook">
                        <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                    </li>
                    <li className="icon instagram">
                        <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                    </li>
                    <li className="icon whatsapp">
                        <FontAwesomeIcon icon={faWhatsapp} className="social-icon" />
                    </li>
                    <li className="icon youtube">
                        <FontAwesomeIcon icon={faYoutube} className="social-icon" />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SocialMedia;
