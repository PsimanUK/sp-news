import React from 'react';

const ErrorFrame = ({ error, errorMessage }) => {
    if (errorMessage) return <p>{errorMessage}</p>
    const { status } = error.response;
    const { msg } = error.response.data
    return (
        <section>
            {error ? <p>We have encountered the following {status} error: {msg}</p> : <p>YOU HAVE ENCOUNTERED AN ERROR!</p>}
        </section>
    );
};

export default ErrorFrame;