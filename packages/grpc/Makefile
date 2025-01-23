protoc:
	protoc \
		--plugin=node_modules/ts-proto/protoc-gen-ts_proto \
		--ts_proto_out=./src/pb -I=./proto ./proto/*.proto \
		--ts_proto_opt=nestJs=true \
		--ts_proto_opt=unrecognizedEnum=false \
		--ts_proto_opt=addGrpcMetadata=true \
		--ts_proto_opt=useNullAsOptional=true \
		--ts_proto_opt=fileSuffix=.pb


