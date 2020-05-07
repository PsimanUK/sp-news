import React from 'react';

const Header = (props) => {
    const { user } = props;
    return (
        <header className="heading" >
            <h1>SP NEWS</h1>
            <h2>Where the truth comes out to play...</h2>
            {user ? <p>You are logged in as {user}</p> : <button>LOGIN</button>}
        </header>
    );
};

export default Header;