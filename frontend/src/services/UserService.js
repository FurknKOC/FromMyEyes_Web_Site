import axios from 'axios';
import * as Paths from '../services/config';

export default class UserService {
    createUser(userInfo) {
        return new Promise((resolve, reject) => {
            axios.post(Paths.createUser, userInfo).then((res => {
                resolve(res.data);
            }))
                .catch(err => {
                    reject(err);
                })
        })
    }
}