export const CLIENT_SAYS_HELLO = 'client.CLIENT_SAYS_HELLO'

export const sayHello =()=>({
    type: CLIENT_SAYS_HELLO,
    payload: 'Hello World from Client'
})