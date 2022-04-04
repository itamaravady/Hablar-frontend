import { userService } from "../services/user.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'
import { httpService } from "../services/http.service.js";

// import { socketService } from "../services/socket.service.js";

export function loadUsers(filterBy) {
    return async dispatch => {
        try {
            const users = await userService.getUsers(filterBy)
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        }
    }
}
export function resetUsers() {
    return dispatch => {
        dispatch({ type: 'SET_USERS', users: [] })
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const { user, accessToken, refreshToken } = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            });
            dispatch({
                type: 'SET_ACCESS_TOKEN',
                accessToken
            });
            dispatch({
                type: 'SET_REFRESH_TOKEN',
                refreshToken
            });
            // console.log('refreshToken:', refreshToken);
        } catch (err) {
            showErrorMsg('Cannot login')
            console.log('Cannot login', err)
        }
    }
}


export function onSignup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            showErrorMsg('Cannot signup')
            console.log('Cannot signup', err)
        }

    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })
        } catch (err) {
            showErrorMsg('Cannot logout')
            console.log('Cannot logout', err)
        }
    }
}
export function setConversationFilter(filter) {
    return (dispatch) => {
        dispatch({
            type: 'SET_CONVERSATION_FILTER',
            filter
        })
    }
}

export function refreshAuthToken() {
    // return async (dispatch, getState) => {
    //     const refreshToken = getState().userModule.refreshToken;
    //     // console.log('refreshToken:', refreshToken);
    //     // const accessToken = await userService.refreshAccessToken(refreshToken);
    //     // console.log('accessToken:', accessToken);
    //     httpService.jwtIntercept(refreshToken);
    //     dispatch({
    //         type: 'SET_ACCESS_TOKEN',
    //         accessToken,
    //     });
    // }
}

