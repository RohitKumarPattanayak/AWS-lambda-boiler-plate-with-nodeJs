import axios from 'axios'
import { Params } from '../interfaces/axiosParams'
import config from '../config/config'

const postConfig: Params = {
    baseUrl: config.sapApiUrl,
    auth: config.sapApiAuth,
    headers: {},
    method: 'post'
}

const postAPI = async (url: string, data: any): Promise<any> => {
    try {
        const response = await axios({
            ...postConfig,
            url: `${postConfig.baseUrl}/${url}`,
            data
        })
        return {
            status: response.status,
            data: response.data
        }
    } catch (error) {
        return {
            status: error.response.status,
            data: error.response.data
        }
    }
}

const getConfig: Params = {
    baseUrl: config.sapApiUrl,
    auth: config.sapApiAuth,
    headers: {},
    method: 'get'
}

const getAPI = async (url: string, data: any): Promise<any> => {
    try {
        const response = await axios({
            ...getConfig,
            url: `${getConfig.baseUrl}/${url}`
        })
        return {
            status: response.status,
            data: response.data
        }
    } catch (error) {
        return {
            status: error.status,
            data: error.response
        }
    }
}

const putConfig: Params = {
    baseUrl: config.sapApiUrl,
    auth: config.sapApiAuth,
    headers: {},
    method: 'put'
}

const putAPI = async (url: string, data: any): Promise<any> => {
    try {
        const response = await axios({
            ...putConfig,
            url: `${putConfig.baseUrl}/${url}`,
            data
        })
        return {
            status: response.status,
            data: response.data
        }
    } catch (error) {
        return {
            status: error.status,
            data: error.response
        }
    }
}

const patchConfig: Params = {
    baseUrl: config.sapApiUrl,
    auth: config.sapApiAuth,
    headers: {},
    method: 'patch'
}

const patchAPI = async (url: string, data: any): Promise<any> => {
    try {
        const response = await axios({
            ...patchConfig,
            url: `${patchConfig.baseUrl}/${url}`,
            data
        })
        return {
            status: response.status,
            data: response.data
        }
    } catch (error) {
        return {
            status: error.status,
            data: error.response
        }
    }
}

export default { getAPI, postAPI, putAPI, patchAPI }

