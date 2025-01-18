'use strict';

var microservices = require('@nestjs/microservices');
var fs = require('node:fs');
var path = require('node:path');

const protobufPackage = "users";
const USERS_PACKAGE_NAME = "users";
function UsersServiceControllerMethods() {
  return function(constructor) {
    const grpcMethods = ["createUser", "getUser", "updateUser", "deleteUser", "getUsers"];
    for (const method of grpcMethods) {
      const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      microservices.GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods = [];
    for (const method of grpcStreamMethods) {
      const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      microservices.GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
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

exports.USERS_PACKAGE_NAME = USERS_PACKAGE_NAME;
exports.USERS_SERVICE_NAME = USERS_SERVICE_NAME;
exports.UsersServiceControllerMethods = UsersServiceControllerMethods;
exports.UtilsGrpc = UtilsGrpc;
exports.protobufPackage = protobufPackage;
//# sourceMappingURL=index.cjs.map
