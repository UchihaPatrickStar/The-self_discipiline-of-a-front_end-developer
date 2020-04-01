var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')

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

http
    .createServer(function(req,res){
        // 使用url.parse方法将路径解析为一个方便操作的对象，第二个参数为true表示直接将查询字符串转为一个对象（通过query属性访问）
        var parseObj = url.parse(req.url,true)
        // 暗度获取不包含查询字符串的路径部分（该路径不包含？之后的内容）
        var pathname = parseObj.pathname
        if(pathname === '/'){
            fs.readFile('./views/index.html',function(err,data){
                if(err){
                    return res.end('404 Not Found.')
                }
                var htmlStr = template.render(data.toString(),{
                    comments: comments
                })
                res.end(htmlStr)
            })
        }else if(pathname === '/post'){
            fs.readFile('./views/post.html',function(err,data){
                if(err){
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        }else if(pathname.indexOf('/public/') === 0){
            fs.readFile('.' + pathname,function(err,data){
                if(err){
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        }else if(pathname === '/pinglun'){
            // 注意：这个时候无论/pinglun?xxx之后是什么，我都不用担心了，因为我的pathname是不包含？之后的路径
            // res.setHeader('Content-Type', 'text/json; charset=utf-8')
            // res.end(JSON.stringify(parseObj.query))
            // 我们已经使用url模块的parse方法把请求路径中的查询字符串解析成一个对象了
            // 所以接下来要做的就是：
            // 1.获取表单提交的数据 parseObj.query
            // 2.生成日期到数据对象中，然后存储到数组中
            // 3.让用户重新定向跳转到首页/
            //   当用户重新请求/的时候，我数组中的数据以及发生变化了，所以用户看到的页面变了
            var comment = parseObj.query
            comment.dateTime = '2017-11-2 17:11:22'
            comments.unshift(comment)
            // 服务端这个时候已经把数据存储好了，接下来就是让用户重新请求/首页，就可以看到最新的请求内容了
            res.statusCode = 302
            res.setHeader('Location','/')
            res.end()
        }else{
            // 其他的都处理成404  找不到
            fs.readFile('./views/404.html',function(err,data){
                if(err){
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        }
    })
    .listen(3000,function(){
        console.log('running...')
    })