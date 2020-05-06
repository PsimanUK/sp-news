import React, { Component } from 'react';
import * as api from '../utils/api';
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
                <p>{this.state.votes}</p>
                <button onClick={() => this.commentVoteChanger(1)} >VOTE UP</button>
                <button onClick={() => this.commentVoteChanger(-1)} >VOTE DOWN</button>
            </section>
        );
    }

    componentDidMount = () => {
        this.setState({ votes: this.props.comment.votes })
    }

    commentVoteChanger = (voteChange) => {
        const { comment_id } = this.props.comment;
        this.setState({ votes: this.state.votes + voteChange })
        api.updateCommentVote(comment_id, voteChange).then((response) => {
            console.log(response, '<-- response from articleVoteChanger')
        })
            .catch((error) => {
                console.dir(error, '<-- error from articleVoteChanger')
            })
    };

}

export default CommentCard;