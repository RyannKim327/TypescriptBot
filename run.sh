echo 'Welcome to TypescriptBot'
echo 'Developed by Ryann Kim Sesgundo'
echo 'MPOP Reverse II'
echo '[1] Create appstate'
echo '[2] Run in normal mode'
echo '[3] Run in nodemon mode'
echo '[4] Exit'

echo -n 'Enter your command: '
read command

function afterAppstate () {
	echo '[1] Run in normal mode'
	echo '[2] Run in nodemon mode'
	echo '[3] Exit'
	echo -n "Enter you command: "
	read command1
	if [ $command1 == 1 ]; then
		npx ts-node ./src/index.ts
	elif [ $command1 == 2 ]; then
		npx nodemon
	elif [ $command1 == 3 ]; then
		echo 'Thank you'
	else
		afterAppstate
	fi
}

if [ $command == 1 ]; then
	npx ts-node ./generator/appstate.ts
	echo "The appstate updated successfully"
	afterAppstate
elif [ $command == 2 ]; then
	npx ts-node ./src/index.ts
elif [ $command == 3 ]; then
	npx nodemon
elif [ $command == 4 ]; then
	echo 'Thank you'
else
	source ./run.sh
fi