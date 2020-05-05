import React, { Component } from 'react';
import { Link } from '@reach/router';

class ArticlesForm extends Component {

    state = {}

    render() {
        return (
            <form>
                <label>SORT BY: </label>
                <Link to="?sort=comment_count" >COMMENT COUNT</Link>
            </form>
        );
    }
}

export default ArticlesForm;

// {/* <select>
//     <option value="created_at">Date Created</option>
//     <option value="comment_count">Comment Count</option>
//     <option value="votes">Vote Count</option>
// </select> */}