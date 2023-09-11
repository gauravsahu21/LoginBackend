FROM node:18

WORKDIR /app/usr/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4004

ENV env="dev"

ENTRYPOINT ["bash","./entrypoint.sh"]