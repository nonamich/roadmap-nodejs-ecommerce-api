import fs from 'node:fs';
import path from 'node:path';
import yaml from 'yaml';
import { DockerCompose } from './types';

export abstract class SharedUtils {
  static rootDirname: string = path.resolve(__dirname, '../../../');

  static readCompose(composeFilename: string): DockerCompose {
    const file = fs.readFileSync(
      path.join(this.rootDirname, composeFilename),
      'utf8',
    );

    return yaml.parse(file);
  }
}
