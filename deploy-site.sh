#!/usr/bin/env bash

aws s3 sync --delete ./root/$1/dist "s3://$2" --exclude releases && \
aws cloudfront create-invalidation --paths "/*" --distribution-id $3
