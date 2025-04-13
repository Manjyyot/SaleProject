FROM node:22-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm install --save-dev \
    webpack webpack-cli webpack-dev-server \
    style-loader css-loader \
    @babel/core @babel/preset-env @babel/preset-react babel-loader

EXPOSE 3000
CMD ["npm", "start"]

# FROM nginx:stable-alpine as prod
# COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 80
# CMD [ "nginx", "-g", "daemon off;" ]
