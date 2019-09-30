FROM node:8-jessie-slim
MAINTAINER ipang

RUN mkdir -p /restmysql
RUN mkdir -p /restmysql/node_modules && chown -R node:node /restmysql/node_modules
WORKDIR /restmysql
ENV PATH /restmysql/node_modules/.bin:$PATH

COPY package.json /restmysql/package.json

RUN apt-get update
RUN apt-get -y install nano python2.7
RUN ln -s /usr/bin/python2.7 /usr/bin/python
RUN npm install

EXPOSE 3000

CMD ["npm", "start", "start:prod"]
