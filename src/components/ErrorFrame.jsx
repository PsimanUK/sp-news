import React from 'react';

const ErrorFrame = ({ error, errorMessage }) => {
    if (errorMessage) return <p>{errorMessage}</p>
    return (
        <section>
            {error ? <p>We have encountered the following error: {error}</p> : <p>YOU HAVE ENCOUNTERED AN ERROR!</p>}
        </section>
    );
};

export default ErrorFrame;