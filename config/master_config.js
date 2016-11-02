module.exports = {
    environment: process.env.MODE || 'development',
    server: {
        ip: process.env.app_url || '127.0.0.1',
        port: process.env.PORT || 8081
    },
    database_url: process.env.DATABASE_URL || false,
    npm_package_name: process.env.npm_package_name || 'UNKNOWN',
    web_app: process.env.web_app || 'http://127.0.0.1:8080'
}
