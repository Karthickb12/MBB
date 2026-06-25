@echo off
echo Committing changed files...
git add index.html style.css
git commit -m "Update hero background image and remove duplicate photo gallery image"
echo.
echo Pushing changes to remote repository (https://github.com/Karthickb12/MBB)...
git push origin main
echo.
echo Done!
pause
