import React, { Component } from 'react';
import * as api from '../utils/api';
import CommentPoster from './CommentPoster';
import CommentCard from './CommentCard';

class Comments extends Component {

    state = {
        comments: [],
        isMounted: false

    };

    render() {
        if (this.state.isMounted === false) return <p>Fetching comments...</p>
        const { username, article_id } = this.props;
        return (
            <section>
                <CommentPoster username={username} article_id={article_id} updateComments={this.updateComments} />
                {this.state.comments.map((comment) => {
                    return (
                        <CommentCard comment={comment} key={comment.comment_id} username={username} comment_id={comment.comment_id} removeComment={this.removeComment} />
                    )
                })}
            </section>
        );
    }

    componentDidMount = () => {
        api.fetchComments(this.props.article_id).then((response) => {
            this.setState({ comments: response, isMounted: true })

        })
    }

    updateComments = (comment) => {
        this.setState({ comments: [comment, ...this.state.comments], isMounted: true })
    };

    removeComment = (comment_id) => {

        const updatedComments = this.state.comments.filter((comment) => {

            return (comment.comment_id !== comment_id && comment);

        })
        console.log(updatedComments, '<-- updateComments array')
        this.setState({ comments: updatedComments, isMounted: true })

        api.deleteComment(comment_id)
            .catch((error) => {
                console.log(error, '<-- error from deleteComment in removeComment')
            })
    };
}

export default Comments;



