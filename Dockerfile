# Stage 1: Build the React app
FROM node:16-alpine as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Remove backend build stages
# # Build and deploy Products API
# FROM node:14 AS products-build
# WORKDIR /app
# COPY ./backend/products/package.json ./backend/products/
# RUN npm install
# COPY ./backend/products ./backend/products
# RUN npm run build

# # Repeat similar steps for Cart, Wishlist, and Search APIs

# Stage 2: Serve the app with NGINX
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]