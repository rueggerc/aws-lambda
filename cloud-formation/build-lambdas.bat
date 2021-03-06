@echo off
aws cloudformation package --template-file cloudformation.yml --s3-bucket sqs-lambda-chris --output-template-file output.yml && ^
aws cloudformation deploy --template-file output.yml --stack-name sqs-lambda-example --capabilities CAPABILITY_IAM