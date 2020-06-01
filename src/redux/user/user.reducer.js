import userActionTypes from './user.types'

const INITIAL_STATE = {
    logged_in: false,
    name: {
        firstname: null,
        middlename: null,
        lastname: null
    },
    email: null,
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SET_CURRENT_USER:
            return ({
                ...state,
                logged_in: action.payload.logged_in,
                name: action.payload.name,
                email: action.payload.email
            });
        default:
            return state
    }
}

export default userReducer