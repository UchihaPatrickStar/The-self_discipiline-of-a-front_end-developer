var fs = require('fs')
var Student = require('./student')
// Express提供了一种更好的方式
// 专门用来包装路由的
var express = require('express')

// 1.创建一个路由容器
var router = express.Router()

// 2.把路由挂载到router路由器中
router.get('/students',function(req,res){
    // readFile的第二个参数是可选的，传入utf8就是告诉它把读取到的文件直接按照utf-8编码转成我们能忍受的字符
    // 除了这样来转换之外，也可以通过data.toString()的方式
    // fs.readFile('./db.json', 'utf8', function(err,data){
    //     if(err){
    //         return res.status(500).send('Server error.')
    //     }
    //     // console.log(typeof data)
    //     // 从文件中读取到的数据一定是字符串
    //     // 所以这里一定要手动转成对象
    //     var students = JSON.parse(data).students
        
    //     res.render('index.html',{
    //         fruits: [
    //             '苹果',
    //             '香蕉',
    //             '橘子'
    //         ],
    //         students: students
    //     })
    // })

    Student.find(function(err,students){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.render('index.html',{
            fruits: [
                '苹果',
                '香蕉',
                '橘子'
            ],
            students: students
        })
    })
})

router.get('/students/new', function(req,res){
    res.render('new.html')
})

router.post('/students/new', function(req,res){
    // 1.获取表单数据
    // 2.处理
    // 3.发送响应
    // 先读取出来，转成对象
    // 然后往对象中push数据
    // 然后把对象转为字符串
    // 然后把字符串再次写入文件
    Student.save(req.body,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

router.get('/students/edit', function(req,res){
    // 1.在客户端的列表页处理链接问题（需要有id参数）
    // 2.获取要编辑的学生id
    // 3.渲染编辑页面
    //     根据id把学生信息查出来
    //     使用模板引擎渲染页面
    Student.findById(parseInt(req.query.id),function(err, student){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.render('edit.html',{
            student: student
        })
    })
})

router.post('/students/edit', function(req,res){
    // 1.获取表单数据
    //       req.body
    // 2.更新
    //      Student.updateById
    // 3.发送响应
    Student.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete', function(req,res){
    // 1.获取要删除的id
    // 2.根据id执行删除操作
    // 3.根据操作结果发送响应数据
    Student.deleteById(req.query.id,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

// 3.把router导出
module.exports = router


// 这样也不方便
// module.exports = function(app){
//     app.get('/',function(req,res){
//         // readFile的第二个参数是可选的，传入utf8就是告诉它把读取到的文件直接按照utf-8编码转成我们能忍受的字符
//         // 除了这样来转换之外，也可以通过data.toString()的方式
//         fs.readFile('./db.json', 'utf8', function(err,data){
//             if(err){
//                 return res.status(500).send('Server error.')
//             }
//             // console.log(typeof data)
//             // 从文件中读取到的数据一定是字符串
//             // 所以这里一定要手动转成对象
//             var students = JSON.parse(data).students
            
//             res.render('index.html',{
//                 fruits: [
//                     '苹果',
//                     '香蕉',
//                     '橘子'
//                 ],
//                 students: JSON.parse(data).students
//             })
//         })
//     })
    
//     app.get('/', function(req,res){
    
//     })
    
//     app.get('/', function(req,res){
        
//     })
    
//     app.get('/', function(req,res){
        
//     })
    
//     app.get('/', function(req,res){
        
//     })
    
//     app.get('/', function(req,res){
        
//     })
// }
