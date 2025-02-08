import path from 'node:path';

export abstract class SharedUtils {
  public static mono: string = path.resolve(__dirname, '../../../');
}
