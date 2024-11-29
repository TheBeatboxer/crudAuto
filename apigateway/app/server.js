const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

//proxy
app.use('/public', createProxyMiddleware({
    target: 'http://public-service:3000', 
    //target:'http://localhost:3000/cars',
    changeOrigin: true,
    pathRewrite: { '^/public': '' } 
}));


app.use('/private', createProxyMiddleware({
    target: 'http://private-service:3001', 
    //target : 'http://localhost:3001/cars',
    changeOrigin: true,
    pathRewrite: { '^/private': '' } 
}));

app.listen(8080, () => {
    console.log('API Gateway running on port 8080');
});


