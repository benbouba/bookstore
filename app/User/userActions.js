export const USER_SAYS_HELLO = 'user.USER_SAYS_HELLO'

export const sayHello =()=>({
    type: USER_SAYS_HELLO,
    payload: 'Hello World from User'
})