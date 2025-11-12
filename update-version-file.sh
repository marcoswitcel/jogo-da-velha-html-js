#!/usr/bin/bash

# version number
TODAY=$(date '+%Y.%m.%d')
COMMIT_COUNT=$(git rev-list --count HEAD --since="midnight today")
VERSION="$TODAY-$COMMIT_COUNT"

echo "echo -e \"/* Gerado automaticamente */\nexport const version = \\\"$VERSION\\\";\" > src/version.js"
echo -e "/* Gerado automaticamente */\nexport const version = \"$VERSION\";" > src/version.js
