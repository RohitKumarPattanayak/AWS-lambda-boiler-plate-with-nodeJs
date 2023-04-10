import { Sequelize } from 'sequelize-typescript'
import config from './config'
import { HttpCode } from '../interfaces/httpResponse'
import { AppError } from '../utils/appErrors'

import * as dotenv from 'dotenv'
dotenv.config()
const connection = new Sequelize({
    host: config.mysql.host,
    database: config.mysql.database,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    username: config.mysql.user,
    password: config.mysql.pass,
    pool: config.mysql.pool,
    hooks: {
        beforeDefine: function (columns, model) {
            model.tableName = 'tbl_' + model.tableName
        }
    },
    dialectOptions: {
        typeCast: function (field, next) {
            if (field.type === 'DATE') {
                const date = field.string()
                return date
            }
            if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
                const datetime = field.string()
                return datetime ? datetime.replace(/ /g, 'T') + 'Z' : null
            }
            return next()
        }
    },
    timezone: process.env.UTC_TZ,
    logging: false
})

connection.query = async function () {
    try {
        return await Sequelize.prototype.query.apply(this, arguments)
    } catch (err) {
        global.__loggerType__ = config.LOGGER_TYPES.db
        const dbErrorObj = {
            database: config.mysql.database,
            error_number: err?.parent?.errno,
            message: err?.message,
            sql_query: err?.sql
        }
        console.log('Query Error: ' + JSON.stringify(dbErrorObj))

        if (err?.parent?.errno === 1062) {
            throw new AppError({
                httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                statusCode: HttpCode.DUPLICATE
            })
        }
        throw new AppError({
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            description: err.message
        })
    }
}

export { connection }

