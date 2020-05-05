import React from 'react';

const ArticlesForm = (props) => {
    const { updateSortBy } = props;
    return (
        <form>
            <label for="sort-selector">SORT BY: </label>
            <select id="sort-selector">
                <option value="created_at" onClick={() => updateSortBy('created_at')}>Date</option>
                <option value="comment_count" onClick={() => updateSortBy('comment_count')} >Comments</option>
                <option value="votes" onClick={() => updateSortBy('votes')} >Votes</option>
            </select>
        </form>
    );
};

export default ArticlesForm;
