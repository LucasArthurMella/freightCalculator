FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4200

RUN npm run build

EXPOSE 4200

CMD ["npm", "run", "preview", "--", "--host"]
