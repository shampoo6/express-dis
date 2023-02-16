import express, { Express } from 'express';
import { GlobalKey } from '../constants/GlobalKey';
import path from 'path';
import { Config } from '../types/Config';
import fsp from 'fs/promises';
import cors from 'cors';

export default class App {
  public static ins: App;
  private readonly staticDirMap: Map<string, string>;
  public e: Express;
  private errorHandler: (err, req, res, next) => void;
  private readonly parserList: (() => void)[];

  constructor() {
    this.staticDirMap = new Map<string, string>();
    this.parserList = new Array<() => void>();
    this.e = express();
    App.ins = this;
  }

  /**
   * 初始化
   */
  public async init() {
    global[GlobalKey.RouterUrlAndCallback] = {};
    global[GlobalKey.RouterUrlAndCallback][GlobalKey.Get] = {};
    global[GlobalKey.RouterUrlAndCallback][GlobalKey.Post] = {};
    global[GlobalKey.InjectMap] = new Map<any, any>();

    // 读取配置文件
    const args = process.argv.slice(2);
    let configPath;
    for (const arg of args) {
      if (arg.startsWith('--cfg')) {
        configPath = arg.split('=')[1];
        break;
      }
    }
    const configFilePath = configPath
      ? path.resolve(process.cwd(), configPath)
      : path.resolve(process.cwd(), 'edis.config.js');
    const config: Config = await import(configFilePath);

    // 跨域
    if (config.cors) {
      this.e.use(cors());
    }

    // 创建静态资源目录映射
    for (const entries of this.staticDirMap) {
      this.e.use(entries[0], express.static(entries[1]));
    }

    this.e.use(express.urlencoded({ extended: true }));
    this.e.use(express.json());

    // 添加其他参数解析器
    for (const parser of this.parserList) {
      this.e.use(parser as any);
    }

    // 解析 @router @get @post
    const configFileDir = path.dirname(configFilePath);
    for (const dir of config.scanDirs) {
      const dirPath = path.resolve(configFileDir, dir);
      const files = await fsp.readdir(dirPath);
      for (const file of files) {
        await import(path.resolve(dirPath, file));
      }
    }

    // 解析 @inject
    const injectMap: Map<any, () => void> = global[GlobalKey.InjectMap];
    for (const entries of injectMap) {
      entries[1]();
    }
  }

  /**
   * 创建静态资源目录
   * @param url 地址
   * @param _path 目录路径
   */
  public staticAssetsDir(url: string, _path: string) {
    this.staticDirMap.set(url, _path);
  }

  /**
   * 统一异常处理
   * @param callback
   */
  public setErrorHandler(callback: (err, req, res, next) => void) {
    this.errorHandler = callback;
  }

  /**
   * 添加参数解析器
   * @param middleware
   */
  public addParser(middleware: () => void) {
    this.parserList.push(middleware);
  }

  public listen(port: number, callback: () => void): void {
    if (this.errorHandler) this.e.use(this.errorHandler);
    this.e.listen(port, callback);
  }
}
