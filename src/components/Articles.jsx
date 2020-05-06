import React, { Component } from 'react';
import * as api from '../utils/api';
import ArticleCard from './ArticleCard';
import ArticlesForm from './ArticlesForm';

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
        isMounted: false,
        sort_by: 'created_at'
    }

    render() {
        if (this.state.isMounted === false) return <p>Fetching Articles...</p>
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

        if (topic_slug !== prevProps.topic_slug || this.state.sort_by !== prevState.sort_by) {
            api.fetchArticles(topic_slug, this.state.sort_by).then((response) => {
                this.setState({ articles: response.articles, isMounted: this.state.isMounted })
            }).catch((error) => {
                console.dir(error, 'YOU HAVE AN ARTICLE TOPIC ERROR')
            })
        }
    }

    componentDidMount = () => {
        console.log('Articles Mounted!')
        api.fetchArticles().then(({ articles }) => {
            this.setState({ articles, isMounted: true, currentTopic: 'all' })

        }).catch((error) => {
            console.log(error, 'YOU HAVE AN ARTICLES ERROR')
        })
    };

    updateSortBy = (sort_by) => {
        if (sort_by !== this.state.sort_by) {
            this.setState({ sort_by })
        };
    };
};

export default Articles;