import {
    ADD_BOOK_TO_STORAGE,
    GET_BOOK_INFO,
    GET_IMAGES
} from './actions';

const initialState = {
    books: [],
    bookData: [],
    imageStorage: [],
    bookInfoData: [],
};

function BookReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_BOOK_TO_STORAGE:
            return {
                ...state,
                bookData: action.payload
            };
        case GET_BOOK_INFO:
            return {
                ...state,
                bookInfoData: action.payload,
            };
        case GET_IMAGES:
            return {
                ...state,
                imageStorage: action.payload,
            };
        default:
            return state;
    }
}

export default BookReducer