import React, { Component } from 'react';
import { Link } from '@reach/router';
import DisplayBar from './DisplayBar';
import * as api from '../utils/api';

class NavBar extends Component {

    state = {
        topics: [{ slug: '', description: '' }],
        sort_by: 'asc',
        currentTopic: 'all'
    }

    render() {
        return (
            <nav>
                <section className="NavBarSelectors" >
                    <Link to="/"><button>ALL ARTICLES</button></Link>
                    {this.state.topics.map((topic) => {
                        return <Link to={`/topics/${topic.slug}`}><button onClick={this.handleTopicClick} value={topic.slug}>{topic.slug.toUpperCase()} ARTICLES</button></Link>
                    })}
                </section>
                <br />
                <section>
                    <DisplayBar currentTopic={this.state.currentTopic} />
                </section>
            </nav>
        );
    }

    componentDidMount = () => {
        return api.fetchTopics().then(({ data: { topics } }) => {
            this.setState({ topics, sort_by: this.state.sort_by });
        })
    };

    // componentDidUpdate = (prevProps, previousState) => {
    //     if (this.prevProps !== this.state)
    //         console.log('Something changed...')
    //     console.dir(this.state)
    // }

    handleTopicClick = (event) => {
        const { value } = event.target;
        this.setState({ currentTopic: value, topics: this.state.topics, sort_by: this.state.sort_by })
    }

}

export default NavBar;

// <Link to="/topics"><label>TOPICS</label></Link>


// cDM with get request for all topics
// map over all the topics and have links to the parametric route for the topics
// no sorting here, please!


