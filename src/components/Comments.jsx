import React, { Component } from 'react';
import { formatDate } from '../utils/utils';
import * as api from '../utils/api';
import CommentPoster from './CommentPoster';

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
                        <section key={comment.comment_id} >
                            <p>{comment.body}</p>
                            <p>{comment.author}</p>
                            <p>{formatDate(comment.created_at)}</p>
                            <p>{comment.votes}</p>
                            <button>VOTE UP</button>
                            <button>VOTE DOWN</button>
                        </section>
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
}

export default Comments;



