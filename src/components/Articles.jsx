import React, { Component } from 'react';
import * as api from '../utils/api';
import ArticleCard from './ArticleCard';
import ArticlesForm from './ArticlesForm';
import ErrorFrame from './ErrorFrame';

class Articles extends Component {

    state = {
        articles: [{
            author: '',
            title: '',
            article_id: '',
            topic: '',
            created_at: '',
            votes: '',
            comment_count: '',
            view_count: ''
        }],
        isFetching: true,
        sort_by: 'created_at',
        error: false,
        currentTopic: 'most popular'
    }

    render() {
        if (this.state.isFetching === true) return <p>Fetching Articles...</p>
        if (typeof this.state.error === 'string') return <ErrorFrame errorMessage={this.state.error} />
        console.log(this.props, '<-- this.props')
        // const { currentTopic } = this.state;
        return (
            <main className="articles_frame" >
                <section className="DisplayBar">
                    <p className="DisplayBarInfo" >Currently Displaying {this.state.currentTopic[0].toUpperCase() + this.state.currentTopic.substr(1)} Articles</p>
                </section>
                <ArticlesForm updateSortBy={this.updateSortBy} />
                {this.state.articles.map((article) => {
                    return <ArticleCard key={article.article_id} article={article} />
                })}
            </main>
        );
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { topic_slug } = this.props;
        const { sort_by } = this.state;

        if (topic_slug !== prevProps.topic_slug || sort_by !== prevState.sort_by) {
            this.getArticles(topic_slug, sort_by);
        }
    }

    componentDidMount = () => {
        console.log(this.props, '<-- this.props in cDM')
        const { topic_slug } = this.props;
        if (topic_slug) this.getArticles(topic_slug);
        else if (this.props.path === '/') this.getArticles(undefined, 'view_count', 5);
        else this.getArticles();


    };

    updateSortBy = (sort_by) => {
        if (sort_by !== this.state.sort_by) {
            this.setState({ sort_by })
        };
    };

    getArticles = (topic_slug, sort_by, limit) => {
        const { currentTopic } = this.props;
        api.fetchArticles(topic_slug, sort_by, limit).then(({ articles }) => {
            if (articles.length === 0) {
                this.setState({ error: `Sorry. We don't have any ${this.props.topic_slug} articles.`, isFetching: false });
            } else {
                this.setState({ articles, isFetching: false, currentTopic })
            }


        }).catch((error) => {
            this.setState({ error })
            // return <ErrorFrame error={error.response.data.msg} status={error.response.data.status} />
        })
    }

};

export default Articles;


////////////////////////

// Attempt at error handling invalid topics

// topicChecker = (topic_slug) => {
    //     let hasTopic = false;
    //     api.fetchTopics().then((response) => {

    //         return response.data.topics.forEach((topic) => {
    //             // console.log(topic.slug, '<-- the current topic slug', topic_slug, '<-- the requested topic slug')
    //             if (topic.slug === topic_slug) {
    //                 hasTopic = true;
    //             }
    //         })
    //     })
    //     console.log(hasTopic, '<-- checked topic before return')
    //     return hasTopic;
    // }