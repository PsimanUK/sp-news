import React, { Component } from 'react';
import { formatDate } from '../utils/utils';

class CommentCard extends Component {

    state = {
        votes: ''
    }

    render() {
        const { comment } = this.props;
        return (
            <section className="comment-card" >
                <p>{comment.body}</p>
                <p>{comment.author}</p>
                <p>{formatDate(comment.created_at)}</p>
                <p>{comment.votes}</p>
                <button>VOTE UP</button>
                <button>VOTE DOWN</button>
            </section>
        );
    }
}

export default CommentCard;