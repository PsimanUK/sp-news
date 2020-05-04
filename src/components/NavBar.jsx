import React, { Component } from 'react';
import { Link } from '@reach/router';
import DisplayBar from './DisplayBar';

class NavBar extends Component {

    state = {
        sort_by: ''
    }

    render() {
        return (
            <nav>
                <section className="NavBarSelectors" >
                    <Link to="/"><label>ARTICLES</label></Link>
                    <Link to={`/${this.state.sort_by}`}><label>SORT BY</label></Link>
                    <Link to="/topics"><label>TOPICS</label></Link>
                </section>
                <br />
                <section>
                    <DisplayBar />
                </section>
            </nav>
        );
    }
}

export default NavBar;