import React from 'react';

const Header = (props) => {
    const { user } = props;
    return (
        <header className="heading" >
            <h1 className="site-header" >SP NEWS</h1>
            <h2 className="site-tagline" >Where the truth comes out to play...</h2>
            {user ? <p className="logged-in-message" >You are logged in as {user}</p> : <button>LOGIN</button>}
        </header>
    );
};

export default Header;