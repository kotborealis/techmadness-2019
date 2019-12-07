const http = require('http');
const keepAliveAgent = new http.Agent({keepAlive: true});

module.exports = [
    {
        context: ['/api/v1'],
        target: 'http://185.251.38.131:8081',
        pathRewrite: {'^/api/v1/' : '/rest/api/'},
        secure: false,
        changeOrigin: true
    }
];