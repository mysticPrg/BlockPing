FROM node:latest
MAINTAINER mysticPrg <mysticPrg@gmail.com>

RUN mkdir /home/BlockPing
COPY ./ /home/BlockPing

WORKDIR /home/BlockPing
RUN npm install

CMD node main