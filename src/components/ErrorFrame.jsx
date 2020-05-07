import React from 'react';

const ErrorFrame = ({ error }) => {

    return (
        <div>
            {error ? <p>We have encountered the following error: {error}</p> : <p>YOU HAVE ENCOUNTERED AN ERROR!</p>}
        </div>
    );
};

export default ErrorFrame;