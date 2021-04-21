import firebase from 'firebase/app'
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCwA0K6Q4iAtG8O2_uHSiSHkaiArn9W-0c",
    authDomain: "longthao-e2071.firebaseapp.com",
    projectId: "longthao-e2071",
    storageBucket: "longthao-e2071.appspot.com",
    messagingSenderId: "522016036336",
    appId: "1:522016036336:web:a4c99d8283d13b62deb935"
}

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const storageRef = firebase.storage();
export const idGenerator = () => {
    const S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
export default firebase;