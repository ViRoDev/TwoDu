FROM node:latest
WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY ./ ./

EXPOSE 3001