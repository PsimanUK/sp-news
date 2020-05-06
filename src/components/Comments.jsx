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
        return (
            <section>
                <CommentPoster username={this.props.username} article_id={this.props.article_id} updateComments={this.updateComments} />
                {this.state.comments.map((comment) => {
                    return (
                        <CommentCard comment={comment} key={comment.comment_id} />
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

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.comments.length !== prevState.comments.length) {
            console.log('A comment has been added or removed. And prevProps.article_id is ', prevProps.article_id)
            api.fetchComments(prevProps.article_id).then((response) => {
                this.setState({ comments: response, isMounted: true })

            })
        }
    }

    updateComments = (comment) => {
        this.setState({ comments: [comment, ...this.state.comments], isMounted: true })
    };

    commentVoteChanger = () => {
        this.setState()
    };
}

export default Comments;



