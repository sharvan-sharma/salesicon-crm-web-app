import userActionTypes from './user.types'

const INITIAL_STATE = {
    logged_in: false,
    name: {
        firstname: null,
        middlename: null,
        lastname: null
    },
    email: null,
    phone:null,
    photo:null,
    id:null,
    account_type:null,
    createdAt:null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return ({
                ...state,
                logged_in: action.payload.logged_in,
                name: action.payload.name,
                email: action.payload.email,
                phone:action.payload.phone,
                photo:action.payload.photo,
                account_type:action.payload.account_type,
                createdAt:action.payload.createdAt
            });
        case userActionTypes.SET_USER_PHOTO:
            return ({
                ...state,
                photo:action.payload
            });
        case userActionTypes.SET_USER_NAME:
            return ({
                ...state,
                name:action.payload
            });
        case userActionTypes.SET_USER_PHONE:
            return ({
                ...state,
                phone:action.payload
            });
        default:
            return state
    }
}

export default userReducer