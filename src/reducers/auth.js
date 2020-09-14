//setting default as an empty object
export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid //user id for auth
            };
        case 'LOGOUT': 
            return {};  //state back to empty
        default:
            return state;

    }
};