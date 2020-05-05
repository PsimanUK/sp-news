import React, { Component } from 'react';
import * as api from '../utils/api';
import * as utils from '../utils/utils'
import Comments from './Comments';

class IndividualArticle extends Component {

    state = { article: { author: '', title: '', article_id: 0, body: '', topic: '', created_at: '', votes: 0, comment_count: 0 }, isMounted: false };

    render() {
        if (this.state.isMounted === false) return <p>Just Fetching the Article for you...</p>;
        const { author, title, body, article_id, created_at, topic, votes, comment_count } = this.state.article;
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
                    </div>
                    <div className="column-three">
                        <button className="card__button">HIDE</button>
                        <p className="card__author" >{author}</p>
                    </div>
                </article>
                <h3>See Below For Comments</h3>
                <Comments article_id={article_id} />
            </section>
        );
    };

    componentDidMount = () => {
        console.log('Individual Article Mounted!');
        const { article_id } = this.props;
        console.log(article_id, '<-- Individual Article props article_id')
        api.fetchIndividualArticle(article_id).then((response) => {
            console.dir(response, '<-- the response form Individual Article cDM')
            this.setState({ article: response, isMounted: true })
        })

    };
};

export default IndividualArticle;