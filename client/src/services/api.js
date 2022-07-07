import axios from 'axios'

const api = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
})

export default api