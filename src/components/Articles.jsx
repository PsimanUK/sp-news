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
        sort_by: 'created_at'
    }

    render() {
        if (this.state.isFetching === true) return <p>Fetching Articles...</p>
        return (
            <main >
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
            api.fetchArticles(topic_slug, sort_by).then((response) => {
                this.setState({ articles: response.articles, isFetching: false })
            }).catch((error) => {
                return <ErrorFrame error={error} />
            })
        }
    }

    componentDidMount = () => {
        console.log('Articles Mounted!')
        api.fetchArticles().then(({ articles }) => {
            this.setState({ articles, isFetching: false, currentTopic: 'all' })

        }).catch((error) => {
            return <ErrorFrame error={error} />
        })
    };

    updateSortBy = (sort_by) => {
        if (sort_by !== this.state.sort_by) {
            this.setState({ sort_by })
        };
    };
};

export default Articles;