import { userService } from "../services/user.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'


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
export function getUserByName(username) {
    return async () => {
        try {
            return userService.getUserByName(username)
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        };
    }
}

export function resetUsers() {
    return dispatch => {
        dispatch({ type: 'SET_USERS', users: [] })
    }
}

// export function removeUser(userId) {
//     return async dispatch => {
//         try {
//             await userService.remove(userId)
//             dispatch({ type: 'REMOVE_USER', userId })
//         } catch (err) {
//             console.log('UserActions: err in removeUser', err)
//         }
//     }
// }

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const { user, accessToken, refreshToken } = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            });
            dispatch(_setTokens(accessToken, refreshToken));

        } catch (err) {
            console.log('err:', err);
        }
    }
}


export function onSignup(credentials) {
    return async (dispatch) => {
        try {
            const { user, accessToken, refreshToken } = await userService.signup(credentials)
            console.log('user,accessToken,refreshToken:', user, accessToken, refreshToken);
            dispatch({
                type: 'SET_USER',
                user
            });
            dispatch(_setTokens(accessToken, refreshToken));

        } catch (err) {
            showErrorMsg('Cannot signup')
            console.log('Cannot signup', err)
        }

    }
}


function _setTokens(accessToken, refreshToken) {
    return (dispatch) => {
        try {
            dispatch({
                type: 'SET_ACCESS_TOKEN',
                accessToken
            });
            dispatch({
                type: 'SET_REFRESH_TOKEN',
                refreshToken
            });
        } catch (err) {
            console.log('err:', err);
        }
    }
}


export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout();
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

export function setAccessToken(accessToken) {
    return async (dispatch) => {
        //     // console.log('refreshToken:', refreshToken);
        //     // const accessToken = await userService.refreshAccessToken(refreshToken);
        //     // console.log('accessToken:', accessToken);
        //     httpService.jwtIntercept(refreshToken);
        dispatch({
            type: 'SET_ACCESS_TOKEN',
            accessToken,
        });
    }
}

