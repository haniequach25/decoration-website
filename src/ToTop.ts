import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

interface Props {
    history: any,
}

const ToTop: React.FC<Props> = ({ history }) => {
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        }
    }, []);

    return (null);
}

export default withRouter(ToTop);