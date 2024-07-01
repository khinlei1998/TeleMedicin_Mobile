// import axios from "axios";
// export const LOAD_USER = LOAD_USER
// export const CREATE_TEST = CREATE_TEST
// const INITIAL_USER = {
//     users: [
//         {

//         }
//     ]
// }

// export function loadUsers() {
//     return (dispatch) => {
//         axios.get("https://demo.aggademo.me/nap_prevention/Backend/public/v1/product")
//             .then(({ data }) => {
//                 dispatch({
//                     type: LOAD_USER,
//                     payload: data.data,
//                 });
//                 // dispatch(setArticleDetails(data));
//             })
//             .then(error => console.log(error));
//     }
// }

// export function createtest(props) {
//     return (dispatch) => {
//         axios.get("https://demo.aggademo.me/nap_prevention/Backend/public/v1/product")
//             .then(({ data }) => {
//                 dispatch({
//                     type: CREATE_TEST,
//                     payload: data.data,
//                 });
//                 // dispatch(setArticleDetails(data));
//             })
//             .then(error => console.log(error));
//     }
// }

// export default function testreducer(state = INITIAL_USER, action) {

//     switch (action.type) {
//         case LOAD_USER:

//             return { ...state, users: action.payload };
//         case CREATE_TEST:

//             return { ...state, users: action.payload };
//         default:
//             return state
//     }
// }