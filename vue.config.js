module.exports = {
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 18880,
        proxy: 'http://127.0.0.1:23333'
    }
};