interface Params {
    baseUrl: string
    headers: any
    auth: Auth
    method: string
}

interface Auth {
    username: string
    password: string
}
export { Params }

