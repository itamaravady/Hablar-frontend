import { storageService } from './async-storage.service'
import { httpService } from './http.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'user'

export const userService = {
    login,
    logout,
    signup,
    save,
    getLoggedinUser,
    refreshAccessToken,
    getUsers,
    getUserByName,
}

async function getUsers(filterBy) {
    const users = await httpService.get('user', filterBy)
    return users;
}

function getUserByName(username) {
    return httpService.get(`${STORAGE_KEY}/getByUsername`, username);
}


async function login(userCred) {
    try {
        const { user, accessToken, refreshToken } = await httpService.post('auth/login', userCred);
        _saveLocalUser(user);
        httpService.setTokens(accessToken, refreshToken);
        return { user, accessToken, refreshToken }
        // socketService.emit('set-user-socket', user._id);
    } catch (err) {
        console.log('err:', err);
    }

}
async function signup(userCred) {

    const { user, accessToken, refreshToken } = await httpService.post('auth/signup', userCred);
    httpService.setTokens(accessToken, refreshToken);
    // socketService.emit('set-user-socket', user._id);
    _saveLocalUser(user);
    return { user, accessToken, refreshToken };
}
async function save(user) {

    user = await httpService.put('user/:id', user)
    return _saveLocalUser(user)
}
function logout() {
    console.log('logging out');
    return httpService.post('auth/logout')
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

async function refreshAccessToken(refreshToken) {
    const res = await httpService.get('auth/refresh', { refreshToken });
    return res.accessToken;
}

