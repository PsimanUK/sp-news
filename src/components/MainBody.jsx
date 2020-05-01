import React from 'react';
import { Router } from '@reach/router';
import Articles from './Articles';


const MainBody = () => {
    return (
        <Router>
            <Articles path="/" />
        </Router>
    );
};

export default MainBody;