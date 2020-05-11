import moment from 'moment';

export const formatDate = (date) => {
    return new Date(date).toString();
};

export const formatDateMoment = (date) => {
    return moment(date).format('MMM Do YYYY');
};

export const relativeDate = (date) => {
    return moment(date, 'YYYYMMDD').fromNow()
}
