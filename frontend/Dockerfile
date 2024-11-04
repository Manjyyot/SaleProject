FROM node:22 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm install --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader
RUN npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader
RUN npm run build

FROM nginx:stable-alpine as prod
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]