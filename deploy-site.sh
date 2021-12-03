#!/usr/bin/env bash

mkdir -p ~/.aws
cat > ~/.aws/credentials << EOF
[gb-deploy]
aws_access_key_id=$AWS_ACCESS_KEY_ID
aws_secret_access_key=$AWS_SECRET_ACCESS_KEY
EOF

export AWS_PROFILE=gb-deploy

aws s3 sync --delete --acl public-read ./root/$1/dist "s3://$2" && \
aws cloudfront create-invalidation --paths "/*" --distribution-id $3
