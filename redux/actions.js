export const ADD_BOOK_TO_STORAGE = 'ADD_BOOK_TO_STORAGE';
export const GET_BOOK_INFO = 'GET_BOOK_INFO';
export const GET_IMAGES = 'GET_IMAGES';

export const addBook = books => dispatch => {
    dispatch({
        type: ADD_BOOK_TO_STORAGE,
        payload: books
    });
};

export const addBookInfo = info => dispatch => {
    dispatch({
        type: GET_BOOK_INFO,
        payload: info
    });
};

export const addImages = img => dispatch => {
    dispatch({
        type: GET_IMAGES,
        payload: img
    });
};
