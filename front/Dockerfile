# Stage 1: Compile and Build angular codebase
FROM node:latest as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . ./

RUN npm install -g @angular/cli@latest && npm run build

# Stage 2: Serve app with nginx server
FROM nginx:latest
COPY --from=build /app/dist/front /usr/share/nginx/html
EXPOSE 80
