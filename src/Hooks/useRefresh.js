import axios from "../api/axios";
import { useDispatch } from 'react-redux'
const useRefreshToken = () => {
    const dispatch = useDispatch()

    const refresh = async () => {
        const res = await axios.get('/refresh', {
            withCredentials: true
        });
        dispatch({
            type: 'SET_ACCESS_TOKEN',
            accessToken: res.data.accessToken
        })
        return res.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;