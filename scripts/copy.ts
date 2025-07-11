import { copyFileSync } from 'fs';
import { resolve } from 'path';

const getFileAbsolutePath = (path) => resolve(__dirname, path);

// copyFile 在读取文件时候使用绝对路径
const copyFile = (copyPath: string, targetPath: string) =>
  copyFileSync(copyPath, targetPath);

export const copyReadmeFile = (targetPaths: string[]) => {
  const README_PATH = getFileAbsolutePath('../README.md');
  targetPaths.forEach((target: string) => {
    copyFile(README_PATH, getFileAbsolutePath(target));
  });
};

// 复制README.md文件至所有packages包中
copyReadmeFile([
  '../packages/component/README.md',
  '../packages/plugin/README.md',
]);
