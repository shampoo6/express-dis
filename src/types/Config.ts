/**
 * 配置对象
 */
export type Config = {
  /**
   * 是否跨域
   */
  cors?: boolean;
  /**
   * 扫描目录
   */
  scanDirs: string[];
};
