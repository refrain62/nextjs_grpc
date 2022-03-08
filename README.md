# Next.js で始める gRPC 通信
https://numb86-tech.hatenablog.com/entry/2022/02/12/154459 の写経   


## 環境について
「client」と「server」それぞれのフォルダ内でそれぞれ動くものを実装します。   
gRPCの定義については「protos」フォルダとします。   


## リポジトリに追加
```
git init
git add *
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/refrain62/nextjs_grpc.git
git push -u origin main
```

## 依存関係について
動作確認は Node.js のv16.13.2   
利用しているライブラリは以下の通り   

- gRPC サーバ   
```
@grpc/grpc-js@1.5.5
google-protobuf@3.19.4
grpc_tools_node_protoc_ts@5.3.2
grpc-tools@1.11.2
ts-node-dev@1.1.8
typescript@4.5.5
```

- gRPC クライアント   
```
@grpc/grpc-js@1.5.5
@types/node@17.0.17
@types/react@17.0.39
eslint-config-next@12.0.10
eslint@8.9.0
google-protobuf@3.19.4
grpc_tools_node_protoc_ts@5.3.2
grpc-tools@1.11.2
next@12.0.10
react-dom@17.0.2
react@17.0.2
typescript@4.5.5
```


## サーバーの開発
- まずは開発に必要なライブラリの準備
```
mkdir server
cd server

npm install -g grpc-tools

#npm config set unsafe-perm true
#npm install protoc-gen-grpc-ts -g

yarn add @grpc/grpc-js grpc-tools google-protobuf ts-protoc-gen
yarn add google-protobuf
yarn add -D grpc-tools grpc_tools_node_protoc_ts
```

- 次に codegenというディレクトリを生成し、protoファイルをコンパイルしてコード出力
```
mkdir codegen

↓Windows10
yarn run grpc_tools_node_protoc --plugin=./node_modules/.bin/protoc-gen-ts.cmd --js_out=import_style=commonjs,binary:codegen --grpc_out=grpc_js:codegen --ts_out=grpc_js:codegen -I ../ ../protos/user.proto

↓それ以外
yarn run grpc_tools_node_protoc --plugin=./node_modules/.bin/protoc-gen-ts --js_out=import_style=commonjs,binary:codegen --grpc_out=grpc_js:codegen --ts_out=grpc_js:codegen -I ../ ../protos/user.proto
```
※Windowsの場合は「protoc-gen-ts.cmd」に変更しないとエラーになります。   
「--ts_out: protoc-gen-ts: %1 is not a valid Win32 application.」   

- codegen/protos に４つファイルが出力されていることを確認
```
user_grpc_pb.d.ts
user_grpc_pb.js
user_pb.d.ts
user_pb.js
```

- TypeScriptの利用準備
```
yarn add -D typescript
yarn run tsc --init
```

- src/index.ts を記述


- ts-node-dev を使ってサーバーを起動
```
yarn add -D ts-node-dev
yarn run ts-node-dev src/index.ts
```



## クライアントの開発
- まずはルートフォルダに移動し、ベースプロジェクト作成
```
yarn create next-app client --ts
```

- /client に移動し必要なライブラリの追加
```
yarn add @grpc/grpc-js google-protobuf
yarn add -D grpc-tools grpc_tools_node_protoc_ts
mkdir codegen

↓Windows
yarn run grpc_tools_node_protoc --plugin=./node_modules/.bin/protoc-gen-ts.cmd --js_out=import_style=commonjs,binary:codegen --grpc_out=grpc_js:codegen --ts_out=grpc_js:codegen -I ../ ../protos/user.proto

↓それ以外
yarn run grpc_tools_node_protoc --plugin=./node_modules/.bin/protoc-gen-ts --js_out=import_style=commonjs,binary:codegen --grpc_out=grpc_js:codegen --ts_out=grpc_js:codegen -I ../ ../protos/user.proto
```
※Windowsの場合は「protoc-gen-ts.cmd」に変更しないとエラーになります。   
「--ts_out: protoc-gen-ts: %1 is not a valid Win32 application.」   
   
   
- gRPCクライアント機能の実装 /pages/api/user.ts

- gRPCクライアント画面の実装 /pages/index.ts


## サーバーとクライアントをそれぞれ起動して動作確認
- サーバー
```
cd ./server

yarn run ts-node-dev src/index.ts
 or
yarn dev
```
![サーバーログ](/_description/server.jpg "サーバーログ")


- クライアント
```
cd ./client

yarn dev
```
正常動作時
![動作サンプル](/_description/sample1.jpg "動作サンプル")

通信エラー時
![通信エラー時](/_description/sample2.jpg "通信エラー時")

![クライアントログ](/_description/client.jpg "クライアントログ")

   
## 参考文献
・gRPCで使う.protoファイルの書き方まとめ   
https://qiita.com/Captain_Blue/items/b7a1f4a42f48559fac0c   
