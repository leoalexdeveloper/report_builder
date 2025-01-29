"use server"
import axios from 'axios'
export const Register = async (data: FormData) => {
    const fetchResult = await axios.post('http://localhost:4000/user/register', data)
    .then(r => r.data).catch(err => err)
    return fetchResult
}