const AuthReducer = (state, action)=>{
    switch (action.type) {
        case 'LoginStart':
            return {
                isFetching: true,
                user: null,
                error: false
            }
        case 'LoginSuccess':
            return {
                isFetching: false,
                user: action.payload,
                error: false
            }
        case 'LoginFailed':
            return {
                isFetching: false,
                user: null,
                error: action.payload
            }
        case 'Follow':
            return {
                ...state,
                user: {...state.user,following: [
                    ...state.user.following,action.payload
                ]}
            }
        default:
            return state;
    }
}

export default AuthReducer;