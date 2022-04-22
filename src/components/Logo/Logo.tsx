import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    className?: string,
}

const Logo: React.FC<Props> = (props) => {
    return (
        <div
            className={`logo-container ${props && props.className ? props.className : ""}`}
        >

            <Link to={"/"} className="h2">
                haut corner<span>.</span>
            </Link>

        </div >
    );
}

export default Logo;