import React from 'react';

const Header = (props) => {
    return (
        <header className="heading" >
            <h1>SP NEWS</h1>
            <h2>Where the truth comes out to play...</h2>
            <button>LOGIN</button>
            <p>You are logged in as {props.user}</p>
        </header>
    );
};

export default Header;