#!/bin/bash

set -e

if [[ -z $CODEBUILD_START_TIME ]]; then
    echo ">>> copy git pre-commit hook <<<"
    cp ./zscripts/git-pre-commit.sh ./.git/hooks/pre-commit
    chmod +x ./.git/hooks/pre-commit
fi
