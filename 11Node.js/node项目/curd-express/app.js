var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()

app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

app.engine('html',require('express-art-template'))

// 配置模板引擎和body-parser一定要在app.use(router)挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

// 把路由容器挂载到app服务
app.use(router)
// router(app)

app.listen(3000, function(){
    console.log('running...')
})