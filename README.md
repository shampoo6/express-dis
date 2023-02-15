# express-dis

基于 `express` 和 `typescript` 的依赖注入服务器

## 特性

- 实现依赖注入
- 实现对象管理
- 使用 `typescript` 的装饰器

## 安装

```shell
npm install express-dis
```

添加配置文件 `edis.config.js` 到项目根目录

```js
// 这是个例子
module.exports = {
    // 是否跨域
    cors: true,
    // 扫描目录
    scanDirs: [
        "../../dist/example/controllers",
        "../../dist/example/providers"
    ]
}
```

或者运行的时候添加参数 `--cfg` 指定文件路径

```shell
node dist/example/test.js --cfg=src/example/edis.config.js
```

然后创建一个应用，例如:

```typescript
import App from "express-dis";
import fileUpload from 'express-fileupload'
import path from 'path'

const app = new App()
// 添加静态资源目录
app.staticAssetsDir('/', '/abc')
app.staticAssetsDir('/xyz', '/123')
// 设置统一异常处理器
app.setErrorHandler((err, req, res, next) => {
    res.json({success: false, msg: err.message})
})
// 添加其他的参数解析器
app.addParser(fileUpload({
    limits: {fileSize: 10 * 1024 * 1024},
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    defParamCharset: 'utf8'
}))
// 初始化
app.init().then(() => {
    app.listen(8080, () => {
        console.log('server start on: http://127.0.0.1:8080')
    })
})
```

> **注意:** 必须在所有配置结束后使用 `app.init` 然后再使用 `app.listen`

## 装饰器

### @router

添加 `express` 路由器

```
// url: 路由器地址
@router(url: string)
```

### @get @post

添加 `get` 或 `post` 接口

```
// url: 路由地址
@get(url: string)
@post(url: string)

// 函数需要是异步的，例如
@get('/test')
public async test(){}
```

### @provider

供其他类注入的类

```
// 没有参数
@provider
```

### @inject

任意 `@router` 或 `@provider` 的类中可以使用，用于注入其他 `@router` 或 `@provider` 的实例对象

```
// className: 要注入的类名
@inject(className: string)
```

### @middleware

在 `@router` 的类中可以添加

作用是添加中间件

```
// 没有参数
@middleware

// 函数需要是异步的，例如
@middleware
public async m(){}
```
