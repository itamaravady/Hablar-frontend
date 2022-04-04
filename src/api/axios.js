import Axios from 'axios'

export default Axios.create({
    withCredentials: true
})

export const axiosPrivate = Axios.create({
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});