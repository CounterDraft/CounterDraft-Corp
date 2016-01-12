module.exports = {
    environment: process.env.MODE || 'development',
    server: {
        ip: 'localhost',
        port: process.env.PORT || 3000
    },
    database: {
        host: 'localhost',
        port: 3306,
        user: '',
        password: '',
        database: 'counterdraft_development',
        table: 'log',
        level: 'info',
        multipleStatements: true
    },
    //TODO: Moved to the environment settings.
    base: {
        url: 'https://api.getbase.com',
        APIKEY: 'qq6fRS7FYRixZj2cfZE4',
        accessToken: 'Bearer 355fbeeea15339efc362b40b7530a2e219a5ab700bf0b3e38f80e4edb0c92e23'
    },
    email: {}
};


