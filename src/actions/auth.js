import {firebase,googleAuthProvider} from '../firebase/firebase';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

//returning a function , that means it is a async action
export const startLogin = () => {
    return () => {
        //returning for promise chaining , so others in other files or this file can latch on to it
        return firebase.auth().signInWithPopup(googleAuthProvider);

    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    }
};