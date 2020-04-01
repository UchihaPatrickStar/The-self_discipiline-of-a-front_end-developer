// 这个配置文件，起始就是一个js文件，通过Node中的模块操作，向外暴露了一个配置对象
const path = require ('path')
// 配置热更新的第二步
const webpack = require('webpack')
// 导入在内存中生成HTML页面的插件
// 只要是插件，都一定要放到plugins节点中去
// 这个插件的两个作用：
// 1.自动在内存中根据指定页面生成一个内存的页面
// 2.自动把打包好的bundle.js追加到页面中去
const htmlWebpackPlugin = require('html-webpack-plugin')

// 通过Nod模块操作，向外面暴露一个配置对象
module.exports = {
    entry: path.join(__dirname, './src/main.js'), // 打包文件
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js' // 打包好的文件名
    },
    mode: 'development', // 设置mode
    devServer: { // 这是配置dev-server命令参数的第二种形式，相对来说，这种方式麻烦一些
        // --open --port 3000 --contentBase src --hot
        open: true, //自动打开浏览器
        port: 3000, //设置启动时候的运行端口
        contentBase: 'src', //指定托管的根目录
        hot: true //启用热更新的第一步   （热更新可以减少打包文件的请求，只修改的部分当做补丁添加上去，可以实现页面无刷新更新）
    },
    plugins: [ //配置插件的节点
        new webpack.HotModuleReplacementPlugin(), //new 一个热更新的模块对象，这是启用热更新的第三步
        new htmlWebpackPlugin({ // 创建一个在内存中生成HTML页面的插件
            template: path.join(__dirname, './src/index.html'), //指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html' // 指定生成的页面的名称
        })
    ],
    module: { //这个节点，用于配置所有的第三方模块、加载器
        rules: [ // 所有第三方模块的匹配规则
            {test: /\.css$/, use:['style-loader', 'css-loader']}, //这是处理.css文件的第三方loader规则,从右向左处理
            {test: /\.less$/, use:['style-loader', 'css-loader', 'less-loader']}, //配置处理.less文件的第三方loader规则
            {test: /\.scss$/, use:['style-loader', 'css-loader', 'sass-loader']}, //配置处理.scss文件的第三方loader规则
            {test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=7630&name=[hash:8]-[name].[ext]'}, //配置处理图片路径的第三方loader规则
            // limit给定的值是图片的大小，单位是byte，如果我们引用的图片大于给定的limit值，则不会被转为base64格式的字符串，如果图片小于或等于给定的limit值，则会被转为base64格式的字符串
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'}, //处理字体文件的loader
            { test:/\.js$/, use: 'babel-loader', exclude:/node_modules/ } //配置Babel来转换高级的ES语法
        ]
    }
}