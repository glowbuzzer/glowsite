#!/usr/bin/env bash

aws s3 sync --region eu-west-1 --delete ./root/$1/dist "s3://$2" --include "index.html" --include "assets/*" --exclude "releases/*" --exclude "examples/*" --exclude "gbr/*" && \
aws cloudfront create-invalidation --region eu-west-1 --paths "/*" --distribution-id $3
