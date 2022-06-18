#!/bin/sh
echo "Waiting for database to be up..."

echo "" | nc -w 1  bdbd-mongo 27017

while [ ! $? -eq 0 ]; do
    sleep 1
    echo "" | nc -w 1  bdbd-mongo 27017
done
sleep 5
echo -e "\nDatabase up..."
sleep 5
echo -e "Starting app..."

npm start