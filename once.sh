#!/bin/sh
docker run -i -t --rm -p 8080:8080 -v $(pwd):/home/BlockPing mysticprg/block_ping /bin/bash