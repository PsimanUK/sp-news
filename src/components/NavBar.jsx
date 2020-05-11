import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../utils/api';

class NavBar extends Component {

    state = {
        topics: [{ slug: '', description: '' }],
        sort_by: 'asc',
    }

    render() {
        return (
            <nav>
                <section className="NavBarSelectors" >
                    <Link to="/articles" key="all" ><button onClick={this.handleTopicClick} value='all' >ALL ARTICLES</button></Link>
                    {this.state.topics.map((topic) => {
                        return <Link to={`/topics/${topic.slug}`} key={topic.slug}><button onClick={this.handleTopicClick} value={topic.slug}>{topic.slug.toUpperCase()} ARTICLES</button></Link>
                    })}
                    <Link to="/" key="popular" ><button onClick={this.handleTopicClick} value='most popular' >MOST POPULAR</button></Link>
                </section>
                <br />
            </nav>
        );
    }

    componentDidMount = () => {
        return api.fetchTopics().then(({ data: { topics } }) => {
            this.setState({ topics, sort_by: this.state.sort_by });
        })
    };

    handleTopicClick = (event) => {
        const { currentTopicChanger } = this.props;
        const { value } = event.target;
        currentTopicChanger(value);
        // this.setState({ currentTopic: value, topics: this.state.topics, sort_by: this.state.sort_by })
    }

}

export default NavBar;



// cDM with get request for all topics √
// map over all the topics and have links to the parametric route for the topics √
// no sorting here, please! √