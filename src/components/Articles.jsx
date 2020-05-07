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
        }],
        isFetching: true,
        sort_by: 'created_at',
        error: false
    }

    render() {
        if (this.state.isFetching === true) return <p>Fetching Articles...</p>
        if (this.state.error === true) return <ErrorFrame errorMessage={`We don't have any ${this.props.topic_slug} articles.`} />
        return (
            <main className="articles_frame" >
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

        const { topic_slug } = this.props;

        this.getArticles(topic_slug);

    };

    updateSortBy = (sort_by) => {
        if (sort_by !== this.state.sort_by) {
            this.setState({ sort_by })
        };
    };

    getArticles = (topic_slug, sort_by) => {
        api.fetchArticles(topic_slug, sort_by).then(({ articles }) => {
            this.setState({ articles, isFetching: false, currentTopic: topic_slug && 'all' })

        }).catch((error) => {
            return <ErrorFrame error={error} />
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