#!/bin/sh
docker build --tag mysticprg/block_ping .
docker run -d -p 8080:8080 --name block_ping -v $(pwd):/home/BlockPing mysticprg/block_ping
docker rmi $(docker images -f "dangling=true" -q)