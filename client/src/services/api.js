import axios from 'axios'

console.log(process.env.SERVER_URL)
console.log(process.env)
const api = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
})

export default api