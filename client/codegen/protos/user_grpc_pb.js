// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// gRPCの書き方について指南
// https://qiita.com/Captain_Blue/items/b7a1f4a42f48559fac0c
//
// バージョン定義
'use strict';
var grpc = require('@grpc/grpc-js');
var protos_user_pb = require('../protos/user_pb.js');

function serialize_UserRequest(arg) {
  if (!(arg instanceof protos_user_pb.UserRequest)) {
    throw new Error('Expected argument of type UserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UserRequest(buffer_arg) {
  return protos_user_pb.UserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UserResponse(arg) {
  if (!(arg instanceof protos_user_pb.UserResponse)) {
    throw new Error('Expected argument of type UserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UserResponse(buffer_arg) {
  return protos_user_pb.UserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// パッケージの定義
// 他の.protoファイルで定義したメッセージを使う時など名前の衝突を避けるためにパッケージ名を設定可能
// package user
//
// import
// 他の.protoファイルで定義したメッセージ型を使いたい場合に使う
// 例はGoogleが作成した.protoファイルを import している
// import "google/protobuf/timestamp.proto";
// import "google/protobuf/duration.proto";
//
// サービスとRPCメソッド定義
var UserManagerService = exports.UserManagerService = {
  get: {
    path: '/UserManager/get',
    requestStream: false,
    responseStream: false,
    requestType: protos_user_pb.UserRequest,
    responseType: protos_user_pb.UserResponse,
    requestSerialize: serialize_UserRequest,
    requestDeserialize: deserialize_UserRequest,
    responseSerialize: serialize_UserResponse,
    responseDeserialize: deserialize_UserResponse,
  },
};

exports.UserManagerClient = grpc.makeGenericClientConstructor(UserManagerService);
