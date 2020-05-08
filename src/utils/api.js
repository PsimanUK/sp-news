import axios from 'axios';

export const fetchArticles = (topic, sort_by, order) => {
    return axios.get('https://sp-news.herokuapp.com/api/articles', { params: { topic, sort_by } }).then(({ data }) => {
        return { articles: data.articles };
    })
};

export const fetchIndividualArticle = (article_id) => {
    return axios.get(`https://sp-news.herokuapp.com/api/articles/${article_id}`).then(({ data }) => {
        console.dir(data, "<-- data from fetchIndividualArticle")
        return data.article;
    })
};

export const fetchComments = (article_id) => {
    return axios.get(`https://sp-news.herokuapp.com/api/articles/${article_id}/comments`).then(({ data }) => {
        return data.comments;
    })
};

export const fetchTopics = () => {
    return axios.get('https://sp-news.herokuapp.com/api/topics').then((response) => {
        return response;
    })
};

export const postComment = (article_id, username, body) => {
    return axios.post(`https://sp-news.herokuapp.com/api/articles/${article_id}/comments`, { username, body })
        .then((response) => {
            return response;
        })
};

export const updateArticleVote = (article_id, voteChange) => {
    return axios.patch(`https://sp-news.herokuapp.com/api/articles/${article_id}`, { inc_votes: voteChange })
        .then((response) => {
            return response;
        })
};

export const updateArticleViewCount = (article_id, viewed) => {
    return axios.patch(`https://sp-news.herokuapp.com/api/articles/${article_id}`, { viewed })
        .then((response) => {
            return response;
        })
};

export const updateCommentVote = (comment_id, voteChange) => {
    return axios.patch(`https://sp-news.herokuapp.com/api/comments/${comment_id}`, { inc_votes: voteChange })
        .then((response) => {
            return response;
        })
};

export const deleteComment = (comment_id) => {
    return axios.delete(`https://sp-news.herokuapp.com/api/comments/${comment_id}`)
        .then((response) => {
            return response;
        })
}