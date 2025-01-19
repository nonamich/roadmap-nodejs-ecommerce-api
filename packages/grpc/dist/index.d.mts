import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request
 * or the response type of an API method. For instance:
 *
 *     service Foo {
 *       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);
 *     }
 */
interface Empty {
}

declare const protobufPackage = "users";
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}
interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}
interface UpdateUserRequest {
    id: number;
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
}
interface DeleteUserRequest {
    id: number;
}
interface GetUserRequest {
    id: number;
}
interface GetUsersRequest {
    page: number;
    pageSize: number;
}
declare const USERS_PACKAGE_NAME = "users";
interface UsersServiceClient {
    createUser(request: CreateUserRequest, metadata?: Metadata): Observable<User>;
    getUser(request: GetUserRequest, metadata?: Metadata): Observable<User>;
    updateUser(request: UpdateUserRequest, metadata?: Metadata): Observable<User>;
    deleteUser(request: DeleteUserRequest, metadata?: Metadata): Observable<Empty>;
    getUsers(request: GetUsersRequest, metadata?: Metadata): Observable<User>;
}
interface UsersServiceController {
    createUser(request: CreateUserRequest, metadata?: Metadata): Promise<User> | Observable<User> | User;
    getUser(request: GetUserRequest, metadata?: Metadata): Promise<User> | Observable<User> | User;
    updateUser(request: UpdateUserRequest, metadata?: Metadata): Promise<User> | Observable<User> | User;
    deleteUser(request: DeleteUserRequest, metadata?: Metadata): void;
    getUsers(request: GetUsersRequest, metadata?: Metadata): Observable<User>;
}
declare function UsersServiceControllerMethods(): (constructor: Function) => void;
declare const USERS_SERVICE_NAME = "UsersService";

declare abstract class UtilsGrpc {
    static getProtoFilePath(packageName: string): string;
}

export { type CreateUserRequest, type DeleteUserRequest, type GetUserRequest, type GetUsersRequest, USERS_PACKAGE_NAME, USERS_SERVICE_NAME, type UpdateUserRequest, type User, type UsersServiceClient, type UsersServiceController, UsersServiceControllerMethods, UtilsGrpc, protobufPackage };
