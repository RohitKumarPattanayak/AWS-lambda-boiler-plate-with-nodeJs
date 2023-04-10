require('dotenv').config();
const dialectOptions = {
    typeCast: function (field, next) {
        if (field.type === 'DATE') {
            return field.string();
        }
        if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
            const datetime = field.string();
            return datetime ? datetime.replace(/ /g, 'T') + 'Z' : null;
        }
        return next();
    }
};
module.exports = {
    development: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        migrationStorage: 'sequelize',
        dialectOptions: dialectOptions,
        timezone: process.env.UTC_TZ
    },
    test: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        migrationStorage: 'sequelize',
        dialectOptions: dialectOptions,
        timezone: process.env.UTC_TZ
    },
    production: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        migrationStorage: 'sequelize',
        dialectOptions: dialectOptions,
        timezone: process.env.UTC_TZ
    },
    qa: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        migrationStorage: 'sequelize',
        dialectOptions: dialectOptions,
        timezone: process.env.UTC_TZ
    }
};
