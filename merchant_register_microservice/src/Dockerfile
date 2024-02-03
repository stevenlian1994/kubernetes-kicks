FROM node:20.10.0
 
WORKDIR /app
 
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

ENV PORT=3001

EXPOSE 3001

CMD [ "npm", "run", "start:prod" ]
