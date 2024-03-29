@echo off
echo 'Welcome to TypescriptBot'
echo 'Developed by Ryann Kim Sesgundo'
echo 'MPOP Reverse II'
echo '[1] Create appstate'
echo '[2] Run in normal mode'
echo '[3] Run in nodemon mode'
echo '[4] Exit'

set /p command="Enter your command: "

if %command%==1 (
	npx ts-node ./generator/appstate.ts
) else if %command%==2 (
	npx ts-node ./src/index.ts
) else if %command%==3 (
	npx nodemon
) else if %command%==4 (
	echo "Thank you"
) else (
	echo "Invalid command"
	run.bat
)

pause