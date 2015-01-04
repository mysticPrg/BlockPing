#!/bin/sh
#docker stop BlockPing
#docker rm BlockPing
#docker build --tag mysticprg/BlockPing .
#docker run -d -p 8080:8080 --name BlockPing -v $(pwd):/home/BlockPing mysticprg/BlockPing
#docker rmi $(docker images -f "dangling=true" -q)
./stop.sh
./start.sh