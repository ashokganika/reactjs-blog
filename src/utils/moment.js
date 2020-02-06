import moment from 'moment';

export function fullDate(date){
    return moment(date).subtract(10, 'days').calendar();
}