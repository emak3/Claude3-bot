FROM node:20

ARG USER_NAME=app
ARG USER_ID=${WORKDIR}

WORKDIR /app

COPY . /app

RUN npm ci

CMD ["npm", "start"]