export const bookstoreUsers = {
    user001: {
        username: 'client001',
        password: 'client1',
        name: 'Homer',
        surname: 'Simpson',
        role: 'client',
        userID: 'user001'
    },
    user002: {
        username: 'client002',
        password: 'client2',
        name: 'Bart',
        surname: 'Simpson',
        role: 'client',
        userID: 'user002'
    },
    adminUser: {
        username: 'admin001',
        password: 'admin',
        name: 'Peter',
        surname: 'Griffin',
        role: 'admin',
        userID: 'adminUser'
    }
}
const assert = (condition, message) => {
    // checking if the condition is false
    if (!condition) {
        alert(`Assertion Error: ${message}`)
    }
}
import {
    store
} from '../../App'
export default function RestService(method, data = null, dataKey = null, userID) {
    // transforming the method to uppercase to avoid errors
    method = method.toUpperCase()

    //  Checking if a valid attribute is used.
    assert(['GET', 'POST', 'PUT', 'DELETE'].includes(method), 'Invalid method for REST API request')
    return new Promise(resolve => setTimeout(()=>{
        let responseData
        if (method === 'POST') {
            RestService.seedData(data, dataKey)
            responseData = data
        } else if (method === 'GET') {
            const jsonResponse = localStorage.getItem(dataKey)
            if(jsonResponse){
                responseData = JSON.parse(jsonResponse)
            }
        } else if (method === 'PUT') {
            const jsonObject = localStorage.getItem(dataKey)
            const data = JSON.parse(jsonObject)
            localStorage.setItem(dataKey, {
                ...itemObject,
                ...data
            })
            responseData = {
                ...itemObject,
                ...data
            }
        } else {
            localStorage.removeItem(dataKey)
            responseData = {}
        }
        if (responseData) {
            resolve(responseData)
        } else {
            resolve(null)
        }
    }), 4000)
}

RestService.getCurrentUser = (username = null, password = null) => {
    return new Promise(resolve => setTimeout(() => {
        let currentUser, users
        if (typeof (Storage) === 'undefined') {
            users = bookstoreUsers
        } else {
            const data = localStorage.getItem('bookstore-users')
            if (!data) {
                localStorage.setItem(`bookstore-users`, JSON.stringify(bookstoreUsers))
                users = bookstoreUsers
            } else {
                users = JSON.parse(data)
            }
        }
        if (username && password) {
            const filteredUsers = Object.values(users).filter(user => {
                if (Object.values(user).indexOf(username) !== -1 && Object.values(user).indexOf(password) !== -1) {
                    return user
                }
            })
            currentUser = filteredUsers[0]
            localStorage.setItem(`currentUser`, JSON.stringify(currentUser))
        } else {
            
            const jsonResponse = localStorage.getItem('currentUser')
            currentUser = JSON.parse(jsonResponse)
        }
        if (currentUser) {
            resolve(currentUser)
        } else {
            return Promise.reject(new Error('User not found'))
        }
    }, 1000))

}
RestService.seedData = (data, key) => {
    setTimeout(() => {
        if (typeof (Storage) !== 'undefined') {
            localStorage.setItem(`bookstore-${key}`, JSON.stringify(data))
        } else {
            const d = new Date()
            d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
            document.cookie = `bookstore-${key}=${JSON.stringify(data)};expires=${d.toUTCString()};path=/`
        }
    }, 1000)
}