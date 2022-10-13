FROM node:latest
WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY docker.env ./.env
COPY prisma ./prisma/
RUN npx prisma generate

EXPOSE 3001