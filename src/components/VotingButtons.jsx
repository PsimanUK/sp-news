import React, { Component } from 'react';
import * as api from '../utils/api';

class VotingButtons extends Component {

    state = {
        votes: 0,
    }

    render() {
        return (
            <section>
                <p className="card__votes">VOTES: {this.state.votes}</p>
                <button onClick={() => this.voteChanger(1)} >VOTE UP</button>
                <button onClick={() => this.voteChanger(-1)} >VOTE DOWN</button>
            </section>
        );
    }

    voteChanger = (voteChange) => {
        const { votes } = this.state;
        console.log(typeof votes, '<-- what the votes are')
        console.log(typeof voteChange, '<-- what the voteChange is')
        if (this.props.article_id) {
            const { article_id } = this.props;
            this.setState({ votes: this.state.votes + voteChange })
            api.updateArticleVote(article_id, voteChange).then((response) => {
                return response;
            })
                .catch((error) => {
                    console.dir(error, '<-- error from commentVoteChanger')
                })
        } else if (this.props.comment_id) {
            const { comment_id } = this.props;
            this.setState({ votes: this.state.votes + voteChange })
            api.updateCommentVote(comment_id, voteChange).then((response) => {
                return response;
            })
                .catch((error) => {
                    console.dir(error, '<-- error from articleVoteChanger')
                })
        }
    };

    componentDidMount = () => {
        this.setState({ votes: this.props.votes });
    }

}

export default VotingButtons;