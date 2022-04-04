import jwtDecode from "jwt-decode";
import { axiosPrivate } from "../api/axios";
import { default as axios } from "../api/axios";

const baseUrl = process.env.NODE_ENV === 'production'
    ? () => '/api/'
    : (port = 3030) => `//localhost:${port}/api/`



export const httpService = {

    get(endpoint, data) {
        return ajax(endpoint, 'GET', data);
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data);
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data);
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data);
    },
    setTokens(accessToken, refreshToken) {
        _setTokens(accessToken, refreshToken);
    }
}
var accessToken;
var refreshToken;
async function ajax(endpoint, method = 'GET', data = null) {
    try {
        if (accessToken) {
            const user = jwtDecode(accessToken);
            var isExpired = (user.exp * 1000 - Date.now()) < 5;
        }
        if (isExpired) {
            const res = await axios.get(`//localhost:3031/api/auth/refresh/?refreshToken=${refreshToken}`);
            accessToken = res.data.accessToken;
        }
        axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

        const currUrl = endpoint.startsWith('auth') ? baseUrl(3031) : baseUrl();
        const res = await axiosPrivate({
            url: `${currUrl}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })

        return res.data
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            sessionStorage.clear()
            window.location.assign('/')
        }
        throw err
    }
}
export function _setTokens(aToken, rToken) {
    accessToken = aToken;
    refreshToken = rToken;
}

// function responseIntercept(accessToken) {
//     axiosPrivate.interceptors.response.use(
//         res => res,
//         async error => {
//             const prevReq = error?.config;
//             if (error?.response?.status === 403 && !prevReq.sent) {
//                 prevReq.sent = true;
//                 const newAccessToken = await refresh();
//                 prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                 return axiosPrivate(prevReq);
//             }
//             return Promise.reject(error);
//         }
//     )
// };
