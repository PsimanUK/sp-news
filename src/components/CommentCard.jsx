import React, { Component } from 'react';
import * as api from '../utils/api';
import { formatDate } from '../utils/utils';

class CommentCard extends Component {

    state = {
        voteChange: 0,
    }

    render() {
        const { comment } = this.props;
        return (
            <section className="comment-card" >
                <p>{comment.body}</p>
                <p>{comment.author}</p>
                <p>{formatDate(comment.created_at)}</p>
                <p>{comment.votes + this.state.voteChange}</p>
                <button onClick={() => this.commentVoteChanger(1)} >VOTE UP</button>
                <button onClick={() => this.commentVoteChanger(-1)} >VOTE DOWN</button>
                {this.props.comment.author === this.props.username &&
                    <button onClick={() => { this.props.removeComment(comment.comment_id) }} >DELETE COMMENT</button>}
            </section>
        );
    }

    commentVoteChanger = (voteChange) => {
        const { comment_id } = this.props.comment;
        this.setState({ voteChange: this.state.voteChange + voteChange })
        api.updateCommentVote(comment_id, voteChange).then((response) => {
            console.log(response, '<-- response from articleVoteChanger')
        })
            .catch((error) => {
                console.dir(error, '<-- error from articleVoteChanger')
            })
    };

    // deleteButton = () => {
    //     // console.log(this.state.comment_id, '<-- the comment ID in deleteButton')
    //     if (this.props.comment.author === this.state.loggedInUser) {
    //         return (
    //             <button onClick={console.log(this.state.comment_id, '<-- the current comment ID for this card')} >DELETE COMMENT</button>
    //         )
    //     }

    // }
    // this.props.removeComment(this.state.comment_id)

}

export default CommentCard;