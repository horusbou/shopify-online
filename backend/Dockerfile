FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install --legacy-peer-deps
RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm run seed && npm run watch"]

