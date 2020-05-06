import React, { Component } from 'react';
import * as api from '../utils/api';

class CommentPoster extends Component {

    state = { commentBody: '', commentSubmitted: false }

    render() {
        return (
            <form onSubmit={this.handleCommentSubmit} >
                <label >Comment:
                    <textarea onChange={this.handleChange} className="comment-input" value={this.state.commentBody} type="text" name="body" placeholder='Enter your comment here...' required ></textarea>
                </label>
                <button>SUBMIT</button>
            </form>
        );
    }

    handleCommentSubmit = (event) => {
        event.preventDefault();
        const body = this.state.commentBody;
        const { username, article_id, updateComments } = this.props;

        return api.postComment(article_id, username, body).then((response) => {
            updateComments(response.data.comment);
            this.setState({ commentBody: '' });
        }).catch((err) => console.dir(err.response, '<-- error from postComment in handleCommentSubmit'))
    };

    handleChange = (event) => {
        this.setState({ commentBody: event.target.value })
    }
}

export default CommentPoster;