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


////////////////////////

// Attempt at error handling invalid topics

// topicChecker = (topic_slug) => {
//     const checkedTopic = [];
//     api.fetchTopics().then((response) => {

//         return response.data.topics.forEach((topic) => {
//             // console.log(topic.slug, '<-- the current topic slug', topic_slug, '<-- the requested topic slug')
//             if (topic.slug === topic_slug) {
//                 checkedTopic.push(topic);
//             }
//         })
//     })
//     console.log(checkedTopic, '<-- checked topic before return')
//     return checkedTopic;
// }

// componentDidUpdate = (prevProps, prevState) => {
//     const { topic_slug } = this.props;
//     const { sort_by } = this.state;

//     if (topic_slug !== prevProps.topic_slug || sort_by !== prevState.sort_by) {
//         console.log(topic_slug, '<-- topic slug')
//         const checkedTopic = this.topicChecker(topic_slug);
//         console.log(checkedTopic, '<-- checked topic')
//         console.log(checkedTopic.length, '<-- checked topic length')
//         if (checkedTopic.length > 0) {
//             api.fetchArticles(topic_slug, sort_by).then((response) => {
//                 this.setState({ articles: response.articles, isFetching: false })
//             }).catch((error) => {
//                 return <ErrorFrame error={error} />
//             })
//         }

//     }
// }