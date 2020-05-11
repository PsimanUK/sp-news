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
        const { ID, path } = this.props;

        this.setState({ votes: votes + voteChange })
        api.updateVote(path, ID, voteChange).then((response) => {
            return response;
        })
            .catch((error) => {
                console.dir(error, '<-- error from commentVoteChanger')
            })

    };

    componentDidMount = () => {
        this.setState({ votes: this.props.votes });
    }

}

export default VotingButtons;