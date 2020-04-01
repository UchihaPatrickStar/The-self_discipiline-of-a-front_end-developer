var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use('/public/',express.static('./public/'))

// 配置使用art-template模板引擎
// 第一个参数，表示，当渲染以.art结尾的文件的时候，使用art-template模板引擎
// express-art-template是专门用来在Express中把art-template整合到Express中
// 虽然外面这里不需要记载art-template 但是也必须安装
// 原因就在于express-art-template依赖了art-template
app.engine('html',require('express-art-template'))

// Express为Response相应对象提供了一个方法，render
// render方法默认是不可以使用的，但是如果配置了模板引擎就可以使用了
// res.render('html模板名'，{模板对象})
// 默认第一个参数不能写路径  默认会去项目中的views目录查找该模板文件
// 也就是说Express有一个约定：开发人员把所有的视图文件都放到views目录中

// 如果想要修改默认的views目录  则可以
// app.set('views',render函数的默认路径)

// 配置body-parser中间件（插件，专门用来解析表单post请求体）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

var comments = [
    {
        name: '张三',
        message: '今天天气不错',
        dateTime: '2015-10-16'
    },
    {
        name: '张三2',
        message: '今天天气不错',
        dateTime: '2015-10-16'
    },
    {
        name: '张三3',
        message: '今天天气不错',
        dateTime: '2015-10-16'
    },
    {
        name: '张三4',
        message: '今天天气不错',
        dateTime: '2015-10-16'
    },
    {
        name: '张三5',
        message: '今天天气不错',
        dateTime: '2015-10-16'
    },
    {
        name: '张三6',
        message: '今天天气不错',
        dateTime: '2015-10-16'
    }
]


app.get('/',function(req,res){
    res.render('index.html',{
        comments: comments
    })
})

app.get('/post',function(req,res){
    res.render('post.html')
})

// 当以post请求/post的时候，执行指定的处理函数
// 这样的话我们就可以利用不同的请求方法让一个请求路径使用多次
app.post('/post',function(req,res){
    // 1.获取表单post请求体数据
    // 2.处理
    // 3.发送请求

    // req.query只能拿get请求参数
    // console.log(req.query)

    var comment = req.body
    console.log(req.body)
    comment.dateTime = '2020-2-21 10:42:31'
    comments.unshift(comment)

    // res.send
    // res.redirect
    // 这些方法会自动结束响应
    res.redirect('/')
    // res.statusCode = 302
    // res.setHeader('Location', '/')
})

// app.get('/pinglun',function(req,res){
//     var comment = req.query
//     comment.dateTime = '2020-2-21 10:42:31'
//     comments.unshift(comment)
//     res.redirect('/')
//     // res.statusCode = 302
//     // res.setHeader('Location', '/')
// })

app.listen(3000,function(){
    console.log('running...')
})