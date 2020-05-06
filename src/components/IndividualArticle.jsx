import React, { Component } from 'react';
import * as api from '../utils/api';
import * as utils from '../utils/utils'
import Comments from './Comments';
import ErrorFrame from './ErrorFrame';

class IndividualArticle extends Component {

    state = { article: { author: '', title: '', article_id: 0, body: '', topic: '', created_at: '', votes: 0, comment_count: 0 }, isMounted: false, error: null };

    render() {
        if (this.state.isMounted === false && !this.state.error) return <p>Just Fetching the Article for you...</p>;
        if (this.state.error) return <ErrorFrame error=/*{this.state.error}*/"THIS ERROR" />;
        const { author, title, body, article_id, created_at, topic, votes, comment_count } = this.state.article;
        const { username } = this.props;
        const formattedDate = utils.formatDate(created_at);
        return (
            <section>
                <article className="card" key={article_id}>
                    <div className="column-one">
                        <p className="card__topic" >TOPIC: {topic}</p>
                        <h3 className="card__title" >{title}</h3>
                        <p className="card__body" >{body}</p>
                        <p className="card__date">{formattedDate}</p>
                    </div>
                    <div className="column-two">
                        <p className="card__votes">VOTES: {votes}</p>
                        <p className="card__comment-count">COMMENTS: {comment_count}</p>
                        <button>VOTE UP</button>
                        <button>VOTE DOWN</button>
                    </div>
                    <div className="column-three">
                        <button className="card__button">HIDE</button>
                        <p className="card__author" >{author}</p>
                    </div>
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

            this.setState({ article: response, isMounted: true })
        }).catch((newError) => {

            this.setState({ error: newError })
        })

    };

    articleVoteChanger = (voteChange) => {
        const { author, title, article_id, body, topic, created_at, votes, comment_count } = this.state.article;
        const { isMounted, error } = this.state;
        this.setState({ article: { author, title, article_id, body, topic, created_at, votes: votes + voteChange, comment_count }, isMounted, error })
        api.updateVote(article_id, voteChange)
    };
};

export default IndividualArticle;