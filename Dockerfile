FROM mhart/alpine-node:8

LABEL maintainer="zhex81@gmail.com"

WORKDIR /workdir
COPY ./dist ./dist
COPY ormconfig.js ./
COPY package.json ./

RUN npm install --production

EXPOSE 3000
CMD [ "node", "dist/server/main.js" ]
