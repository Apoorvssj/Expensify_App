import moment from 'moment'

//for test,dummy data
export default [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0
},{
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: moment(0).subtract(4, 'days').valueOf() //going 4 days in the past,also valueof() is used to get a number,to get regular timestamp back, as created at is a no.
},{
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf()
}];