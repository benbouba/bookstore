export const ADMIN_SAYS_HELLO = 'admin.ADMIN_SAYS_HELLO'

export const sayHello =()=>({
    type: ADMIN_SAYS_HELLO,
    payload: 'Hello World'
})