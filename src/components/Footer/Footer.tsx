import React from 'react';
import Logo from '../Logo/Logo';

const Footer: React.FC = () => {
    return (
        <footer id='footer'>
            <div className="container">
                <div className="footer-container">
                    <div className="contact-information">
                        <Logo className='footer-logo' />
                        <div className="nqt_address">
                            <p>
                                <span>Address: </span>
                                2593 Timbercrest Road, Chisana, Alaska Badalas
                                <br />United State
                            </p>
                        </div>

                        <div className="nqt_info">
                            <p className="nqt-phonenumber">
                                <span>Tel: </span>
                                (+91)7-723-46089867
                            </p>
                            <a className="nqt-email" href="#">
                                <span>Email: </span>
                                demo@demo.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;