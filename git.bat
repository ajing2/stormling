@echo off
@title bat execute git auto commit 
E:
cd E:\stormling
git pull https://github.com/ajing2/stormling.git
git add .
git commit -m "commit"
git push orgin/master