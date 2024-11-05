#!/bin/sh

aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set region $AWS_REGION
aws secretsmanager get-secret-value --secret-id $SECRETS_MANAGER --query SecretString --output text > secrets.json

$(jq -r 'to_entries | .[] | "export \(.key)=\(.value)"' secrets.json)

rm -rf secrets.json

pnpm run portal:start