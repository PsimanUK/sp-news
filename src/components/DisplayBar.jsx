import React from 'react';

const DisplayBar = ({ currentTopic }) => {

    return (
        <div className="DisplayBar">
            <p className="DisplayBarInfo" >Currently Displaying {currentTopic[0].toUpperCase() + currentTopic.substr(1)} Articles</p>
        </div>
    );
};

export default DisplayBar;