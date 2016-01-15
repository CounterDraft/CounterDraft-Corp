module.exports = {
    env: process.env.MODE || 'development',
    server: {
        ip: '127.0.0.1',
        port: process.env.PORT || 8081
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
    base: {
        url: 'https://api.getbase.com',
        APIKEY: 'qq6fRS7FYRixZj2cfZE4',
        accessToken: '355fbeeea15339efc362b40b7530a2e219a5ab700bf0b3e38f80e4edb0c92e23'
    },
    email: {},
    package_name: process.env.npm_package_name || 'test-package',
    web_app: process.env.web_app || 'https://127.0.0.1:8081',
    get: function(v){
        return this[v];
    },
    set: function(value, name){
        this[name] = value;
    }
}
