import axios from 'axios';

export const fetchArticles = (props) => {
    console.dir(props, '<-- fetchArticles props')
    // WHY CAN"T I ACCESS AN OBJECT KEY ON PROPS WHEN I CAN LOG PROPS?

    // let topic = '';
    // let article_id = '';


    // if (props.hasOwnProperty('topic')) {
    //     topic = props.topic;
    // } else {
    //     topic = undefined;
    // }

    // if (props.hasOwnProperty('article_id')) {
    //     article_id = props.article_id;
    // } else {
    //     article_id = undefined;
    // }

    //const { topic, article_id } = props;
    //console.log(`The topic on the props is ${props.topic} and the article_id on the props is ${props.article_id}, which were received by fetchArticles`)

    return axios.get('https://sp-news.herokuapp.com/api/articles', { params: { topic: props } }).then(({ data }) => {
        if (data.articles) return { articles: data.articles };
        if (data.article) return { article: data.article };
    }).catch((error) => {
        console.log(error, '<-- fetchArticles Error')
    })
};

export const fetchIndividualArticle = (article_id) => {
    return axios.get(`https://sp-news.herokuapp.com/api/articles/${article_id}`).then(({ data }) => {
        return data.article;
    }).catch((error) => {
        console.log(error, '<-- fetchTopics Error')
    })
};

export const fetchComments = (article_id) => {
    return axios.get(`https://sp-news.herokuapp.com/api/articles/${article_id}/comments`).then(({ data }) => {
        return data.comments;
    }).catch((error) => {
        console.log(error, '<-- fetchTopics Error')
    })
};

export const fetchTopics = () => {
    return axios.get('https://sp-news.herokuapp.com/api/topics').then((response) => {
        return response;
    }).catch((error) => {
        console.log(error, '<-- fetchTopics Error')
    })
};