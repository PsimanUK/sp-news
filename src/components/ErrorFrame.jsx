import React from 'react';

const ErrorFrame = ({ error }) => {

    return (
        <div>
            {error ? error : <p>YOU HAVE ENCOUNTERED AN ERROR!</p>}
        </div>
    );
};

export default ErrorFrame;