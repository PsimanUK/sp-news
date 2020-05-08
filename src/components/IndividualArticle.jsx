import React, { Component } from 'react';
import * as api from '../utils/api';
import * as utils from '../utils/utils'
import Comments from './Comments';
import ErrorFrame from './ErrorFrame';

class IndividualArticle extends Component {

    state = { article: { author: '', title: '', article_id: 0, body: '', topic: '', created_at: '', votes: 0, view_count: 0, comment_count: 0 }, isFetching: true, commentCountChange: 0, error: '' };

    render() {
        if (this.state.isFetching === true && !this.state.error) return <p>Just Fetching the Article for you...</p>;
        if (this.state.error) return <ErrorFrame error={this.state.error.toString()} />;

        const { author, title, body, article_id, created_at, topic, votes, view_count } = this.state.article;
        const { username } = this.props;
        const formattedDate = utils.formatDate(created_at);
        const comment_count = parseInt(this.state.article.comment_count);

        return (
            <section>
                <article className="card" key={article_id}>
                    <section className="column-one">
                        <p className="card__topic" >TOPIC: {topic}</p>
                        <h3 className="card__title" >{title}</h3>
                        <p className="card__author" >WRITTEN BY: {author}</p>
                        <p className="card__body" >{body}</p>
                        <p className="card__date">{formattedDate}</p>
                    </section>
                    <section className="column-two">
                        <p className="card__votes">VOTES: {votes}</p>
                        <p className="card__comment-count">COMMENTS: {comment_count + this.state.commentCountChange}</p>
                        <button onClick={() => this.articleVoteChanger(1)} >VOTE UP</button>
                        <button onClick={() => this.articleVoteChanger(-1)}>VOTE DOWN</button>
                    </section>
                    <section className="column-three">
                        <p className="card__view_count">VIEWS: {view_count + 1}</p>
                    </section>
                </article>
                <h3>See Below For Comments</h3>
                <Comments article_id={article_id} username={username} />
            </section>
        );
    };

    componentDidMount = () => {
        console.log('Individual Article Mounted!');
        const { article_id } = this.props;

        api.fetchIndividualArticle(article_id).then((response) => {

            this.setState({ article: response, isFetching: false })
        }).catch((newError) => {
            //newError.response.data.msg
            // console.dir(newError, '<-- the newError from cDM in IndividualArticle.jsx')
            this.setState({ error: newError })
        })

    };

    // componentDidUpdate = (prevProps, prevState) => {
    //     const { votes, comment_count } = this.state.article;
    //     if (votes !== prevState.article.votes || comment_count !== prevState.article.comment_count) {
    //         const { article_id } = this.props;
    //         api.fetchIndividualArticle(article_id).then((response) => {

    //             this.setState({ article: response, isFetching: false })
    //         }).catch((newError) => {
    //             // newError.response.data.msg
    //             // console.dir(newError, '<-- the newError from cDU in IndividualArticle.jsx')
    //             this.setState({ error: newError })
    //         })
    //     }
    // }

    articleVoteChanger = (voteChange) => {
        const { author, title, article_id, body, topic, created_at, votes, comment_count } = this.state.article;
        const { isFetching, error } = this.state;
        this.setState({ article: { author, title, article_id, body, topic, created_at, votes: votes + voteChange, comment_count }, isFetching, error })
        api.updateArticleVote(article_id, voteChange).then((response) => {
            return response;
        })
            .catch((newError) => {
                this.setState({ error: newError });
            })
    };

    commentCountChanger = (commentCountChange) => {
        this.setState({ commentCountChange })
    };
};

export default IndividualArticle;

// Add ability to hide unwanted articles if time...

// <button className="card__button">HIDE</button>