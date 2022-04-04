import { storageService } from './async-storage.service'
import { httpService } from './http.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'userDB'

export const userService = {
    login,
    logout,
    signup,
    save,
    getLoggedinUser,
    refreshAccessToken,
    getById,
    getUsers
}

async function getUsers(filterBy) {
    // const user = await storageService.get(STORAGE_KEY, filterBy)
    const users = await httpService.get('user', filterBy)
    return users;
}
async function getById(userId) {
    const user = await storageService.get(STORAGE_KEY, userId)
    // const user = await httpService.get(`user/${userId}`)
    return user;
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

    const user = await httpService.post('auth/signup', userCred)
    // socketService.emit('set-user-socket', user._id);
    return _saveLocalUser(user)
}
async function save(user) {
    user = await httpService.put('user/:id', user)
    // socketService.emit('set-user-socket', user._id);
    return _saveLocalUser(user)
}
async function logout() {
    // sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout')
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

