FROM node:12-slim as buildapp

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install 
COPY . .

RUN npm run build

FROM node:12-slim
WORKDIR /usr/src/app
RUN npm install -g serve
COPY --from=buildapp /usr/src/app/build ./build

EXPOSE 3000
CMD [ "serve", "-s" , "build"]