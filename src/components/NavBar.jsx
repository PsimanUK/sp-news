import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../utils/api';

class NavBar extends Component {

    state = {
        topics: [{ slug: '', description: '' }],
        sort_by: 'asc',
        currentTopic: 'all'
    }

    render() {
        const { currentTopic } = this.state;
        return (
            <nav>
                <section className="NavBarSelectors" >
                    <Link to="/articles" key="all" ><button onClick={this.handleTopicClick} value='all' >ALL ARTICLES</button></Link>
                    {this.state.topics.map((topic) => {
                        return <Link to={`/topics/${topic.slug}`} key={topic.slug}><button onClick={this.handleTopicClick} value={topic.slug}>{topic.slug.toUpperCase()} ARTICLES</button></Link>
                    })}
                </section>
                <br />
                <section className="DisplayBar">
                    <p className="DisplayBarInfo" >Currently Displaying {currentTopic[0].toUpperCase() + currentTopic.substr(1)} Articles</p>
                </section>
            </nav>
        );
    }

    componentDidMount = () => {
        return api.fetchTopics().then(({ data: { topics } }) => {
            this.setState({ topics, sort_by: this.state.sort_by });
        })
    };

    handleTopicClick = (event) => {
        const { value } = event.target;
        this.setState({ currentTopic: value, topics: this.state.topics, sort_by: this.state.sort_by })
    }

}

export default NavBar;



// cDM with get request for all topics √
// map over all the topics and have links to the parametric route for the topics √
// no sorting here, please! √