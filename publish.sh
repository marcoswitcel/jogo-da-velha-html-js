#!/usr/bin/bash

LINE="========================================="

# version number
TODAY=$(date '+%Y.%m.%d')
COMMIT_COUNT=$(git rev-list --count HEAD --since="midnight today")
VERSION="$TODAY-$COMMIT_COUNT"

echo "git checkout main"
git checkout main
echo $LINE

echo "echo -e \"/* Gerado automaticamente */\nexport const version = \\\"$VERSION\\\";\" > src/version.js"
echo -e "/* Gerado automaticamente */\nexport const version = \"$VERSION\";" > src/version.js

echo "git add src/version.js"
git add src/version.js
echo "git commit -m \"version number update\""
git commit -m "version number update"

echo "git checkout gh-pages"
git checkout gh-pages
echo $LINE

echo "git pull origin main"
git pull origin main
echo $LINE

echo "git push"
git push
echo $LINE

echo "git checkout main"
git checkout main
echo $LINE
