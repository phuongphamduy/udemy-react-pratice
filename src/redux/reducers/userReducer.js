import { USER_LOGIN, USER_LOGOUT } from '../actions/userActions';

const INITIAL_STATE = {
    user: { email: '', auth: false },
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGOUT:
            return;
        case USER_LOGOUT:
            return;
        default:
            return state;
    }
};

export default userReducer;
