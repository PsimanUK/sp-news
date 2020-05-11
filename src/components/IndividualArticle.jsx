import React, { Component } from 'react';
import * as api from '../utils/api';
import * as utils from '../utils/utils'
import Comments from './Comments';
import ErrorFrame from './ErrorFrame';
import VotingButtons from './VotingButtons';

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
                        <p className="card__topic" >Topic: {topic.toUpperCase()}</p>
                        <h3 className="card__title" >{title}</h3>
                        <p className="card__author" >Written By: {author.toUpperCase()}</p>
                        <p className="card__body" >{body}</p>
                        <p className="card__date">Created: {formattedDate}</p>
                    </section>
                    <section className="column-two">
                        <p className="card__comment-count">COMMENTS: {comment_count + this.state.commentCountChange}</p>
                        <VotingButtons article_id={article_id} votes={votes} />
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

    // commentCountChanger = (commentCountChange) => {
    //     this.setState({ commentCountChange })
    // };
};

export default IndividualArticle;

// Add ability to hide unwanted articles if time...

// <button className="card__button">HIDE</button>