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
        console.log(`The previous topic_slug is ${prevProps.topic_slug} and the current one is ${topic_slug}.`)
        console.log(`The previous sort_by is ${prevState.sort_by} and the current one is ${this.state.sort_by}.`)

        if (topic_slug !== prevProps.topic_slug || this.state.sort_by !== prevState.sort_by) {
            // const topic = topic_slug
            api.fetchArticles(topic_slug, this.state.sort_by).then((response) => {
                // console.dir(response, '<-- response in cDU')
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
        console.log('Using Articles updateSortBy')
        console.log(sort_by, '<-- the requested sort_by')
        if (sort_by !== this.state.sort_by) {
            this.setState({ sort_by })
            // .then(() => {
            //     console.log(this.state.sort_by, '<-- the new sort_by');
            // })
            // .catch((err) => console.log(err, '<-- updateSortBy err'))

        }

    };

}

export default Articles;

// { data: { articles } }