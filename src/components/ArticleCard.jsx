import React from 'react';
import * as utils from '../utils/utils';
import { Link } from '@reach/router';

const ArticleCard = (props) => {
    const { author,
        title,
        article_id,
        topic,
        created_at,
        votes,
        comment_count }
        = props.article;

    const formattedDate = utils.formatDate(created_at);
    return (
        <article className="card" key={article_id}>
            <div className="column-one">
                <p className="card__topic" >TOPIC: {topic}</p>
                <Link to={`/articles/${article_id}`} ><h3 className="card__title" >{title}</h3></Link>
                <p className="card__date">{formattedDate}</p>
            </div>
            <div className="column-two">
                <p className="card__votes">VOTES: {votes}</p>
                <p className="card__comment-count">COMMENTS: {comment_count}</p>
            </div>
            <div className="column-three">
                <p className="card__author" >{author}</p>
            </div>
        </article>
    );
};

export default ArticleCard;

// Add ability to hide unwanted articles if time...

// <button className="card__button">HIDE</button>