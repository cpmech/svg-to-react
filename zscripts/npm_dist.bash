#!/bin/bash

set -e

OLDVERSION=`jq -r '.version' package.json`

echo
echo "The current version is: $OLDVERSION"

echo
echo "What is the new version?"
read NEWVERSION

echo
echo "The new version is: $NEWVERSION"

if [ "$NEWVERSION" = "$OLDVERSION" ]; then
    echo
    echo "New version must be different than the current version"
    exit 1
fi

echo
echo "Continue? [y/n]"
read CONTINUE

if [ "$CONTINUE" != "y" ]; then
    echo
    echo "Ok, bye"
fi

change() {
    file=$1
    jq '.version = $newVal' --arg newVal $NEWVERSION $file > tmp.$$ && mv -f tmp.$$ $file
}

# change version
change package.json
change package-dist.json

# compile code
echo
echo "🔥 Compiling"
rm -rf dist
npm run rollup --config rollup.config.js

# publish
echo
echo "🚀 Publishing"
cp package-dist.json dist/package.json
cd dist
npm publish --access=public

# git tag
echo
echo "🏷️ Tagging"
cd ..
git add package.json package-dist.json
git tag v`jq -r '.version' package.json`
git commit -m 'Publish' && git push && git push --tags

# done
echo
echo "😀 DONE"
