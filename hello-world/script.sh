#!/bin/sh

prisma deploy
while [ $? != 0 ]
do
    sleep 3
    prisma deploy
done
npm run start
exit 0
