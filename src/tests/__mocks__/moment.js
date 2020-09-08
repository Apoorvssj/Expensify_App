//cannot use normal import cuz it will look for  mocked one and cause stack trace error, we will require actual moment lib
const moment = jest.requireActual('moment'); //by jest

//this is the function that will be called inside of the mocked moment library
//seetting default value ,if timestamp is not given(passed)
export default (timestamp = 0) => {
    return moment(timestamp);
};