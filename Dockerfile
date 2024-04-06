FROM node:20-alpine as build-stage

WORKDIR /app

COPY ./.next/standalone ./.next/standalone
COPY ./.next/static ./.next/standalone/.next/static
COPY ./public ./.next/standalone/public

CMD ["node", "./.next/standalone/server.js"]
