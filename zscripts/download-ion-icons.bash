#!/bin/bash

TMPDIR='/tmp/svg-to-react'
mkdir -p $TMPDIR/assets

curl https://ionicons.com/ionicons.designerpack.zip -o $TMPDIR/assets/ionicons.zip

cd $TMPDIR/assets
unzip ionicons.zip
rm ionicons.zip
