import App from '../core/App';
import fileUpload from 'express-fileupload';
import path from 'path';

const app = new App();
app.staticAssetsDir('/', '/abc');
app.staticAssetsDir('/xyz', '/123');
app.setErrorHandler((err, req, res, next) => {
  res.json({ success: false, msg: err.message });
});
app.addParser(
  fileUpload({
    // 文件大小限制
    limits: { fileSize: 10 * 1024 * 1024 },
    // 使用临时文件
    useTempFiles: true,
    // 临时文件夹路径
    tempFileDir: path.join(__dirname, 'tmp'),
    // 解决中文乱码的字符集参数
    defParamCharset: 'utf8',
  }),
);
app.init().then(() => {
  app.listen(8080, () => {
    // console.log('server start on: http://127.0.0.1:8080');
  });
});
