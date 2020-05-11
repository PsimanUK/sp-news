import React, { Component } from 'react';

class ArticlesForm extends Component {

    state = { value: 'created_at' }

    render() {

        return (
            <form>
                <label className="sort-by_label" htmlFor="sort-selector">SORT BY: </label>
                <select id="sort-selector" value={this.state.value} onChange={this.handleChange} >
                    <option value="created_at" >Date</option>
                    <option value="comment_count" >Comments</option>
                    <option value="votes" >Votes</option>
                    <option value="view_count" >Views</option>
                </select>
            </form>
        );
    };

    handleChange = (event) => {
        const { updateSortBy } = this.props;
        const { value } = event.target;
        this.setState({ value });
        updateSortBy(value)
    };

}

export default ArticlesForm;