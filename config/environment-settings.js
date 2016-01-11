module.exports = {
  environment:  process.env.MODE || 'development',
  server: {
    ip: 'localhost',
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
  email: {}
};