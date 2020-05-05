import React, { Component } from 'react';
import { formatDate } from '../utils/utils';
import * as api from '../utils/api';

class Comments extends Component {

    state = {
        comments: [],
        isMounted: false

    };

    render() {
        if (this.state.isMounted === false) return <p>Fetching comments...</p>
        return (
            <section>
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
}

export default Comments;


