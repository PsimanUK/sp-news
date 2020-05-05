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
        currentTopic: ''
    }

    render() {
        if (this.state.isMounted === false) return <p>Fetching Articles...</p>
        return (
            <main >
                <ArticlesForm />
                {this.state.articles.map((article) => {
                    return <ArticleCard key={article.article_id} article={article} />
                })}
            </main>
        );
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { topic_slug } = this.props;
        if (topic_slug !== this.state.currentTopic) {
            const topic = topic_slug
            api.fetchArticles(topic).then((response) => {
                // console.dir(response, '<-- response in cDU')
                this.setState({ articles: response.articles, isMounted: this.state.isMounted, currentTopic: topic_slug })
            }).catch((error) => {
                console.log('YOU HAVE AN ARTICLE TOPIC ERROR')
            })
        }
    }

    componentDidMount = () => {
        console.log('Articles Mounted!')
        api.fetchArticles().then(({ articles }) => {
            this.setState({ articles, isMounted: true, currentTopic: 'all' })

        }).catch((error) => {
            console.log('YOU HAVE AN ARTICLES ERROR')
        })
    };

}

export default Articles;

// { data: { articles } }