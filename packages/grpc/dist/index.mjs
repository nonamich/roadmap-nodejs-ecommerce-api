import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import fs from 'node:fs';
import path from 'node:path';

const protobufPackage = "users";
const USERS_PACKAGE_NAME = "users";
function UsersServiceControllerMethods() {
  return function(constructor) {
    const grpcMethods = ["createUser", "getUser", "updateUser", "deleteUser", "getUsers"];
    for (const method of grpcMethods) {
      const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods = [];
    for (const method of grpcStreamMethods) {
      const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}
const USERS_SERVICE_NAME = "UsersService";

const PACKAGE_DIR = path.resolve(__dirname, "../");
const PROTO_DIR = path.join(PACKAGE_DIR, "proto");
class UtilsGrpc {
  static getProtoFilePath(packageName) {
    const filePath = path.join(PROTO_DIR, `${packageName}.proto`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`${filePath} file doesn't exist`);
    }
    return filePath;
  }
}

export { USERS_PACKAGE_NAME, USERS_SERVICE_NAME, UsersServiceControllerMethods, UtilsGrpc, protobufPackage };
//# sourceMappingURL=index.mjs.map
