import axios from 'axios';

export const fetchArticles = (props) => {
    console.dir(props, '<-- props in fetchArticles')
    return axios.get('https://sp-news.herokuapp.com/api/articles', { params: { topic: props } }).then(({ data: { articles } }) => {
        return { articles };
    })
};

export const fetchTopics = () => {
    return axios.get('https://sp-news.herokuapp.com/api/topics').then((response) => {
        console.log(response);
        return response;
    })
};