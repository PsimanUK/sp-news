import React, { Component } from 'react';
import * as api from '../utils/api';
import ArticleCard from './ArticleCard';

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
        isMounted: false
    }

    render() {
        if (this.state.isMounted === false) return <p>Fetching Articles...</p>
        return (
            <main >
                {this.state.articles.map((article) => {
                    return <ArticleCard article={article} />
                })}
            </main>
        );
    }

    componentDidMount = () => {
        console.log('Articles Mounted!')
        api.fetchArticles().then((articles) => {
            console.log(articles)
            this.setState({ articles, isMounted: true })

        })
    };

}

export default Articles;

// { data: { articles } }