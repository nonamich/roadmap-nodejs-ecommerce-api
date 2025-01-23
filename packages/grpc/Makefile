protoc:
	protoc \
		--plugin=node_modules/ts-proto/protoc-gen-ts_proto \
		--ts_proto_out=./src/proto -I=./proto ./proto/*.proto \
		--ts_proto_opt=nestJs=true \
		--ts_proto_opt=unrecognizedEnum=false \
		--ts_proto_opt=addGrpcMetadata=true \
		--ts_proto_opt=useNullAsOptional=true \
		--ts_proto_opt=oneof=unions-value \
		--ts_proto_opt=useDate=true


