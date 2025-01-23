protoc:
	protoc \
		--plugin=node_modules/ts-proto/protoc-gen-ts_proto \
		--ts_proto_out=./src/pb -I=./proto ./proto/*.proto \
		--ts_proto_opt=nestJs=true \
		--ts_proto_opt=exportCommonSymbols=false \
		--ts_proto_opt=fileSuffix=.pb


