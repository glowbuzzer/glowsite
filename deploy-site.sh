#!/usr/bin/env bash

mkdir -p ~/.aws
cat > ~/.aws/credentials << EOF
[gb-deploy]
aws_access_key_id=$AWS_ACCESS_KEY_ID
aws_secret_access_key=$AWS_SECRET_ACCESS_KEY
EOF

export AWS_PROFILE=gb-deploy

aws s3 sync --quiet --delete --acl public-read ./root/csr/dist "s3://$1" && \
aws cloudfront create-invalidation --paths "/*" --distribution-id $2
