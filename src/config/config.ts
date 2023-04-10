import * as dotenv from 'dotenv'
dotenv.config()

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost'
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'oig-supervisor'
const MYSQL_USER = process.env.MYSQL_USER || 'root'
const MYSQL_PASS = process.env.MYSQL_PASSWORD || ''

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS,
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 50,
        idle: 1000
    }
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 1337
const SERVER_TOKEN_EXPIRETIME = Number(process.env.SERVER_TOKEN_EXPIRETIME) || 3600
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'spurtree-oig-issuer'
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'oigSupervisorSalt2022'
const SERVER_TOKEN_REFRESH_SECRET = process.env.SERVER_TOKEN_REFRESH_SECRET || 'oigSupervisorRefreshSalt2022'
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expiryTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    },
    enable_forgot_password: process.env.ENABLE_FORGOT_PASSWORD
}

const PAGINATION = {
    limit: 10,
    offset: 0
}

const LOGGER_TYPES = {
    caught: 'caught',
    uncaught: 'uncaught',
    db: 'db',
    rabbitmqLogs: 'rabbitmq-logs'
}

const sapApiAuth = {
    username: process.env.SAP_API_USERNAME,
    password: process.env.SAP_API_PASSWORD
}

const sapApiUrl = process.env.SAP_API_URL

const config = {
    sapApiAuth,
    sapApiUrl,
    mysql: MYSQL,
    server: SERVER,
    pagination: PAGINATION,
    imageUploadLimit: 5,
    LOGGER_TYPES
}

export default config

