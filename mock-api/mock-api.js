module.exports = [
    {
        context: ['/api/v1'],
        target: 'http://185.251.38.131:8080',
        pathRewrite: {'^/api/v1/' : '/rest/api/'},
    }
];