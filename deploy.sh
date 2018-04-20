#!/bin/bash

npm_user_name=$1
npm_user_password=$2
npm_user_email=$3
aws_bucket=$4
aws_access_id=$5
aws_access_secret=$6

npm-cli-login -u $npm_user_name -p $npm_user_password -e $npm_user_email
npm install
npm run dev-no-watch    # to generate the full dist/js/workwell.js file (no minimization/uglification)
npm run prod    # to generate the minimized dist/js/workwell.min.js file and the map file associated

# publish our newest version of the lib to npm
npm publish

# the version number of the library to deploy (retrieved from package.json)
version=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

export AWS_ACCESS_KEY_ID=$aws_access_id
export AWS_SECRET_ACCESS_KEY=$aws_access_secret
export AWS_DEFAULT_REGION=us-east-1

# loop through all the files in dist/js (including the minified one)
for file in dist/js/* ; do
    # publish each file from dist/js to our CDN (S3 bucket here)
    aws s3 cp $file s3://$aws_bucket/libs/workwell/$version/
done