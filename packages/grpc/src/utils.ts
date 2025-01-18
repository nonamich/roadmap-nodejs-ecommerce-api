import fs from 'node:fs';
import path from 'node:path';

const PACKAGE_DIR = path.resolve(__dirname, '../');
const PROTO_DIR = path.join(PACKAGE_DIR, 'proto');

export abstract class UtilsGrpc {
  static getProtoFilePath(packageName: string) {
    const filePath = path.join(PROTO_DIR, `${packageName}.proto`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`${filePath} file doesn't exist`);
    }

    return filePath;
  }
}
