#!/usr/bin/bash

LINE="========================================="


echo "git checkout main"
git checkout main
echo $LINE

echo "git push"
git push
echo $LINE

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
