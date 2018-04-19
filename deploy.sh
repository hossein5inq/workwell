#!/bin/bash

npm-cli-login -u $1 -p $2 -e $3
npm install
npm run dev-no-watch    # to generate the full dist/js/workwell.js file (no minimization/uglification)
npm run prod    # to generate the minimized dist/js/workwell.min.js file and the map file associated

# publish our newest version of the lib to npm
npm publish

#bucket="$1"

# the version number of the library to deploy (retrieved from package.json)
#version=$(cat package.json \
#  | grep version \
#  | head -1 \
#  | awk -F: '{ print $2 }' \
#  | sed 's/[",]//g' \
#  | tr -d '[[:space:]]')

# loop through all the files in dist/js (including the minified one)
#for file in dist/js/* ; do
    # publish each file from dist/js to our CDN (S3 bucket here)
#    aws s3 cp $file s3://$bucket/libs/workwell/$version/
#done