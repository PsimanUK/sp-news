import React from 'react';
import { relativeDate } from '../utils/utils';
import VotingButtons from './VotingButtons';

const CommentCard = (props) => {
    const { comment, username } = props;
    return (
        <section className="comment-card" >
            <p className="comment-card__body" >{comment.body}</p>
            <p className="comment-card__author" >{comment.author}</p>
            <VotingButtons path={'comments'} ID={comment.comment_id} votes={comment.votes} />
            {comment.author === username &&
                <button className="comment-card__delete" onClick={() => { props.removeComment(comment.comment_id) }} >DELETE COMMENT</button>}
            <p className="comment-card__date" >Posted:  {relativeDate(comment.created_at)}</p>
        </section>
    );
};

export default CommentCard;