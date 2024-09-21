FROM node:22.8.0-alpine

WORKDIR /
ADD ssr /
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
