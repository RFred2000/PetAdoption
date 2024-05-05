FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g ts-node
COPY . .
RUN npx prisma generate