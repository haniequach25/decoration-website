import { Breadcrumbs, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    currentPage: string,
    prevPage?: string
}

const BreadCrumb: React.FC<Props> = (props) => {
    return (
        <div className='breadcrumb-nav'>
            <div className="container">
                <div className="breadcrumb-wrapper">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to={"/"}>
                            Home
                        </Link>
                        {props.prevPage ? (<Link to={`/${props.prevPage}`}>
                            {props.prevPage}
                        </Link>) : ""}
                        <Typography color="text.primary" className='current-page-breadcrumb'>{props.currentPage}</Typography>
                    </Breadcrumbs>
                </div>
            </div>
        </div>
    );
}

export default BreadCrumb;