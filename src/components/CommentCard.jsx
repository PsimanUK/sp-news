import React from 'react';
import { formatDate } from '../utils/utils';
import VotingButtons from './VotingButtons';

const CommentCard = (props) => {
    const { comment, username } = props;
    return (
        <section className="comment-card" >
            <p>{comment.body}</p>
            <p>{comment.author}</p>
            <p>{formatDate(comment.created_at)}</p>
            <VotingButtons comment_id={comment.comment_id} votes={comment.votes} />
            {comment.author === username &&
                <button onClick={() => { props.removeComment(comment.comment_id) }} >DELETE COMMENT</button>}
        </section>
    );
};

export default CommentCard;