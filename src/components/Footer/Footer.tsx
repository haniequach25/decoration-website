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
                                <span>Địa chỉ: </span>
                                Phố Cổ, quận Hoàn Kiếm, Hà Nội
                                <br />Việt Nam
                            </p>
                        </div>

                        <div className="nqt_info">
                            <p className="nqt-phonenumber">
                                <span>Số điện thoại: </span>
                                (+84)389-149-961
                            </p>
                            <a className="nqt-email" href="#">
                                <span>Email: </span>
                                lenovoa60quach@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;