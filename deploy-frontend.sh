#!/bin/bash

set -euo pipefail

BUCKET_NAME="atenyanyang.com"
WWW_BUCKET_NAME="www.atenyanyang.com"
BUILD_DIR="dist"

echo "Building..."
npm run build

echo "Deploying to S3..."

aws s3 sync "$BUILD_DIR" "s3://$BUCKET_NAME" --delete
aws s3 sync "$BUILD_DIR" "s3://$WWW_BUCKET_NAME" --delete

echo "Deployment complete!"
